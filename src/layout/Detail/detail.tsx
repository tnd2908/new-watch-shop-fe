import axios from 'axios';
import React, { createElement, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { API_URL } from '../../API/API';
import '../../styles/product.css'
import { Avatar, Button, Comment, Divider, Form, Input, Modal, Progress, Rate, Skeleton, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import SkeletonImage from 'antd/lib/skeleton/Image';
import SkeletonInput from 'antd/lib/skeleton/Input';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper'
import ProductList from '../../component/Home/ProductList';
import { State } from "../../redux";
import { useDispatch, useSelector } from 'react-redux';
import { setProductNewList } from "../../redux/action/product";
import moment from 'moment'
import Aos from 'aos'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

SwiperCore.use([Navigation])
type Params = {
    id: string;
};
interface Detail {
    name: string,
    images: [any],
    price: number,
    description: string,
    color: string,
    category: {
        name: string,
        gender: string
    },
    size: string,
    weight: string,
    material: string,
    comment: []
}

const DetailPage = () => {
    const { id } = useParams<Params>()
    const [form] = Form.useForm()
    const userId = useSelector((state: State) => state.user.userInfor.userId)
    const user = useSelector((state: State) => state.user.userInfor)
    const dispatch = useDispatch()
    const [star, setStar] = useState(0)
    const productNewList: [] = useSelector((state: State) => state.product.productNewList)
    const [total, setTotal] = useState(0)
    const history = useHistory()
    const [render,setRender] = useState(false)
    const [detail, setDetail] = useState<Detail>({
        name: '',
        images: [''],
        price: 0,
        description: '',
        color: '',
        category: {
            name: '',
            gender: ''
        },
        size: '',
        weight: '',
        material: '',
        comment: []
    })
    const [image, setImage] = useState('')
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState<any>(null);
    const [countStar, setCountStar] = useState({
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0
    })
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const postComment = (infor: any) => {
        if (userId)
            try {
                const { star, userComment } = infor
                const data = { star, userComment, userId, userName: `${user.lastName} ${user.firstName}` }
                axios.post(`${API_URL}/product/comment/${id}`, data)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success == true) {
                            Modal.success({
                                title: 'Success',
                                content: 'Posted your comment'
                            })
                            form.resetFields()
                            setRender(!render)
                        }
                        else {
                            Modal.error({
                                title: 'Fail',
                                content: 'Fail to post your comment. Please try again'
                            })
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        else Modal.error({
            title: 'Please login first',
            content: "You cannot write your comment if you don't have an account",
            closable: true,
            okText: 'Login now',
            onOk() {
                history.push('/login')
            }
        })
    }
    const getDetail = () => {
        try {
            axios.get(`${API_URL}/product/${id}`)
                .then(res => {
                    if (res.data.success == true) {
                        setDetail(res.data.data)
                        setImage(`${API_URL}/upload/${res.data.data.images[0]}`)
                        res.data.data.comment.filter((item: any) => {
                            setTotal(res.data.star)
                            setCountStar(res.data.countStar)
                            if (item.userId === userId) {
                                setStar(item.star)
                                form.setFieldsValue({ star: item.star })
                            }
                        })
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getProductList = () => {
        try {
            axios.get(`${API_URL}/product/status/New?page=1`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.success == true) {
                        dispatch(setProductNewList(res.data.data))
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDetail()
    }, [userId, render, id])
    useEffect(() => {
        !productNewList.length && getProductList()
        Aos.init({duration: 1500})
    }, [])
    return (
        <>
            <div className="container component">
                <div className="row">
                    <div className="col-lg-6 mt-1 mb-2">
                        <div className="image-container bg-e">
                            {image ? <img className="detail-image-main" src={image} alt="" /> :
                                <div className="loading-image flex-mid">
                                    <LoadingOutlined style={{ fontSize: '40px', color: 'black' }} />
                                </div>
                            }
                        </div>
                        <div className="container-fluid" style={{ padding: '0' }} >
                            <div className="row" style={{ padding: '0' }}>
                                {detail.images.length && detail.images[0] ? <Swiper
                                    slidesPerView={3}
                                    spaceBetween={10}
                                    navigation={
                                        {
                                            nextEl: '.detail-prev',
                                            prevEl: '.detail-next'
                                        }
                                    }
                                    style={{ padding: '0 10px', position: 'relative' }}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 3,
                                            spaceBetween: 10
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 10
                                        }
                                    }}>
                                    <div className="d-flex detail-image-button-container">
                                        <button className="detail-next"><i className="fal fa-chevron-left"></i></button>
                                        <button className="detail-prev"><i className="fal fa-chevron-right"></i></button>
                                    </div>
                                    {detail.images.map((item: any) => (
                                        <SwiperSlide key={item._id} className="shadow-card rounded">
                                            <div className="sub-image-container w-100 bg-e">
                                                <img onClick={() => setImage(`${API_URL}/upload/${item}`)} src={`${API_URL}/upload/${item}`} alt="" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper> :
                                    <div className="col-4">
                                        <div className="sub-image-container bg-e">
                                            <div className="loading-sub-image flex-mid">
                                                <SkeletonImage />
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 shadow-sm p-4 mt-1 mb-2">
                        {detail.name ? <h2 className="product-name"> {detail.name} </h2> :
                            <div><SkeletonInput active style={{ width: 200 }} /></div>}
                        {detail.price ? <h3 className="product-price"> ${detail.price}.00 </h3> :
                            <div className="mt-4 mb-4"><SkeletonInput active style={{ width: 100 }} /></div>}
                        <div className="d-flex justify-content-between">
                            <div className="d-flex color-detail">
                                <h5>Color: </h5>
                                {detail.color.includes(',') ? <p className="color-block-detail" style={{ backgroundImage: `linear-gradient(150deg, ${detail.color} 65%)` }}></p>
                                    : <p className="color-block-detail" style={{ backgroundColor: ` ${detail.color}` }}></p>}
                            </div>
                            <h4> {detail.category.name} </h4>
                        </div>
                        <div className="detail-body">
                            <Divider orientation="left"><h5>Description</h5></Divider>
                            {detail.description ? <p> {detail.description} </p>
                                : <Skeleton active />}
                            <Divider orientation="left">
                                <h5>Gender: <span className="ml-2">{detail.category.gender}</span></h5>
                            </Divider>
                        </div>
                        <div className="detail-footer">
                            <Button size="large" type="primary" style={{ width: '130px' }}>Buy now</Button>
                            <Button size="large" type="ghost" className="ml-2">Add to cart</Button>
                        </div>
                    </div>
                </div>
                <ProductList list={productNewList} title="Related Product" />
                <div className="row mt-3" data-aos='fade-up'>
                    <div className="col-lg-4 col-12 mt-2">
                        <h2>More Information</h2>
                    </div>
                    <div className="col-md-4 col-6 mt-2">
                        <p className="more-detail">Size of Case</p>
                        <p className="more-detail">Total weight</p>
                        <p className="more-detail">LED support</p>
                        <p className="more-detail">Meterial</p>
                        <p className="more-detail">Water resistance</p>
                    </div>
                    <div className="col-lg-4 col-6 mt-2">
                        <p className="more-detail text-muted"> {detail.size}mm</p>
                        <p className="more-detail text-muted"> {detail.weight}g</p>
                        <p className="more-detail text-muted"><i className="far fa-check"></i></p>
                        <p className="more-detail text-muted"> {detail.material} </p>
                        <p className="more-detail text-muted">200 - meter</p>
                    </div>
                </div>
            </div>
            <div className="container shadow round mb-5" data-aos='fade-up'>
                <div className="row mt-5 pt-3">
                    <div>
                        <Divider orientation='left'>
                            <h3>Write your review</h3>
                        </Divider>
                    </div>
                    <Form
                        name="basic"
                        style={{ padding: '10px' }}
                        labelCol={{ xs: { span: 20, offset: 0 }, sm: { span: 22, offset: 1 } }}
                        wrapperCol={{ xs: { span: 20, offset: 0 }, sm: { span: 22, offset: 1 } }}
                        initialValues={{ remember: true }}
                        layout='vertical'
                        form={form}
                        autoComplete="off"
                        onFinish={postComment}
                    >
                        <Form.Item style={{ margin: '0px', paddingBottom: '0' }}>
                            <div className="d-flex progress-container" >
                                <div className='progress-circle'>
                                    <Progress type='circle' percent={20 * total} strokeColor='#ffec3d' format={() => (
                                        <h3 style={{ color: 'brown' }}> {total} <i style={{ color: '#ffec3d', marginLeft: '2px' }} className="fas fa-star"></i></h3>
                                    )} />
                                </div>
                                <div className="count-star" >
                                    <div className="d-flex">
                                        <h6><Rate disabled defaultValue={5} count={5} className="star"/></h6>
                                        <Progress percent={countStar.fiveStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.fiveStar} vote`} />
                                    </div>
                                    <div className="d-flex">
                                        <h6><Rate disabled defaultValue={4} count={4} className="star"/></h6>
                                        <Progress percent={countStar.fourStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.fourStar} vote`} />
                                    </div>
                                    <div className="d-flex">
                                        <h6><Rate disabled defaultValue={3} count={3} className="star"/></h6>
                                        <Progress percent={countStar.threeStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.threeStar} vote`} />
                                    </div>
                                    <div className="d-flex">
                                        <h6><Rate disabled defaultValue={2} count={2} className="star"/></h6>
                                        <Progress percent={countStar.twoStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.twoStar} vote`} />
                                    </div>
                                    <div className="d-flex">
                                        <h6><Rate disabled defaultValue={1} count={1} className="star"/></h6>
                                        <Progress percent={countStar.oneStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.oneStar} vote`} />
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item
                            label={<h5>Your comment</h5>}
                            name="userComment"
                            rules={[{ required: false, message: 'Please write your comment' }]}
                        >
                            <Input.TextArea rows={5} style={{ backgroundColor: '#f6f6f6' }} placeholder='Write your comment here' />
                        </Form.Item>
                        {star != 0 ? <Form.Item style={{ margin: '0' }}>
                            <p>You voted this {star} stars </p>
                        </Form.Item> : <></>}
                        <Form.Item
                            name="star"
                            rules={[{ required: true, message: 'Please select star' }]}
                        >
                            <Rate />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' size='large' style={{ width: '100px' }} >Post</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Divider orientation='left'><h6> ({detail.comment!.length} comments)</h6></Divider>
                <div className="row">
                    <div className="pw-4">
                        {detail.comment.length ? detail.comment.map((item: any) => (
                            <Comment
                                key={item._id}
                                style={{ borderBottom: '1px solid #eee' }}
                                actions={[
                                    <Tooltip key={item._id + 'like'} title="Like">
                                        <span onClick={like}>
                                            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                                            <span className="comment-action">{likes}</span>
                                        </span>
                                    </Tooltip>,
                                    <Tooltip key={item._id + 'dislike'} title="Dislike">
                                        <span onClick={dislike}>
                                            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                                            <span className="comment-action">{dislikes}</span>
                                        </span>
                                    </Tooltip>,
                                    <span key={item._id}>Reply to</span>,
                                ]}
                                author={<a style={{ fontSize: '17px' }}>{item.userName}</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <div>
                                        <p style={{ fontSize: '15px' }}>
                                            {item.userComment}
                                        </p>
                                        <p>
                                            <Rate disabled defaultValue={item.star} className="star"/>
                                        </p>
                                    </div>
                                }
                                datetime={
                                    <span>{moment(item.createAt).format('DD/MM/YYYY HH:mm')}</span>
                                }
                            />
                        )) : <></>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default DetailPage