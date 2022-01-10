import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { API_URL } from '../../API/API';
import '../../styles/product.scss'
import { Button, Divider, Modal, Skeleton, Form, Collapse, Alert, Rate, Tabs } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import SkeletonInput from 'antd/lib/skeleton/Input';
import SwiperCore, { Navigation } from 'swiper'
import ProductList from '../../component/Common/ProductList';
import { State } from "../../redux";
import {  useSelector } from 'react-redux';
import Aos from 'aos'
import Review from './Components/Review';
import { Detail, Params } from '../../Util/spec';
import Image from './Components/Image';
import PaymentForm from './Components/PaymentForm';
SwiperCore.use([Navigation])
const { Panel } = Collapse
const { TabPane } = Tabs;
const DetailPage = () => {
    const { productName } = useParams<Params>()
    const [form] = Form.useForm()
    const userId = useSelector((state: State) => state.user.userInfor.userId)
    const user = useSelector((state: State) => state.user.userInfor)
    const [star, setStar] = useState(0)
    const [relatedProduct, setRelatedProduct] = useState<[]>([])
    const [total, setTotal] = useState(0)
    const history = useHistory()
    const [render, setRender] = useState(false)
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [detail, setDetail] = useState<Detail>({
        _id: '',
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
        comment: [],
        quantity: 0,
        saleOf: 0,
        saled: 0
    })
    const [countStar, setCountStar] = useState({
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0
    })

    const postComment = (infor: any) => {
        if (userId)
            try {
                const { star, userComment } = infor
                const data = { star, userComment, userId, userName: `${user.lastName} ${user.firstName}` }
                axios.post(`${API_URL}/product/comment/${detail._id}`, data)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success === true) {
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
    const handlePayment = () =>{
        setVisible(true)
    }
    const getDetail = () => {
        setCountStar({
            oneStar: 0,
            twoStar: 0,
            threeStar: 0,
            fourStar: 0,
            fiveStar: 0
        })
        setTotal(0)
        try {
            axios.get(`${API_URL}/product/${productName}`)
                .then(res => {
                    if (res.data.success === true) {
                        setLoading(false)
                        setDetail(res.data.data)
                        setRelatedProduct(res.data.relatedProduct)
                        //Set default rating star for comment form
                        res.data.data.comment.forEach((item: any) => {
                            setTotal(res.data.star)
                            setCountStar(res.data.countStar)
                            if (item.userId === userId) {
                                setStar(item.star)
                                form.setFieldsValue({ star: item.star })
                            }
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setLoading(true)
        getDetail()
        window.scrollTo(0, 0)
    }, [userId, productName])
    useEffect(()=>{
        getDetail()
    },[render])
    useEffect(() => {
        Aos.init({ duration: 600 })
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="container component">
            <div className="row bg-white" style={{paddingTop: '5px'}}>
                <Image detail={detail} isLoading={loading}/>
                <div className="col-lg-6 shadow-sm p-4 mt-1 mb-2">
                    {!loading ? <h2 className="product-name"> {detail.name} </h2> :
                        <div><SkeletonInput active style={{ width: 200 }} /></div>}
                    <Rate defaultValue={total} value={total} disabled className="mt-3" />
                    {!loading ? <h3 className="product-price"> ${detail.price}.00 </h3> :
                        <div className="mt-4 mb-4"><SkeletonInput active style={{ width: 100 }} /></div>}
                    <div className="d-flex justify-content-between">
                        <div className="d-flex color-detail">
                            <h5>Color: </h5>
                            <div className="d-flex color-block-detail">
                                {!loading ? <Link to={`/product/${detail.name}`} style={{ backgroundColor: detail.color }}></Link> :
                                    <SkeletonInput active style={{ width: 40, marginLeft: '20px' }} />}
                                {!loading && relatedProduct.map((item: Detail) =>
                                    <>
                                        {item.color !== detail.color && <Link to={`/product/${item.name}`} style={{ backgroundColor: item.color }}></Link>}
                                    </>)}
                            </div>
                        </div>
                        {!loading ? <h4> {detail.category.name} </h4> :
                            <SkeletonInput active style={{ width: 100 }} />}
                    </div>
                    <div className="detail-body">
                        <Divider orientation="left"><h5>Details</h5></Divider>
                        {!loading ? <ul>
                            <li> {detail.material} </li>
                            <li>Led support</li>
                            <li>Water resistance 200 - meter </li>
                            <li> {detail.size}mm </li>
                            <li> {detail.weight}g </li>
                        </ul>
                            : <Skeleton active />}
                    </div>
                    <div className="detail-button">
                        <Modal footer={null} title='Payment' width={600} visible={visible} onCancel={()=>setVisible(false)}>
                            <PaymentForm total= {detail.price} list={[detail]} closeForm={()=>setVisible(false)}/>
                        </Modal>
                        <Button onClick={handlePayment} size="large" type="primary" style={{ width: '100%' }}>Buy now</Button>
                        <Button size="large" type="ghost" style={{ width: '100%' }} className="ml-2">Add to cart</Button>
                    </div>
                    <div className="detail-service mb-4">
                        <Collapse
                            bordered={false}
                            expandIconPosition="right"
                            expandIcon={({ isActive }) => { if (!isActive) { return <PlusOutlined /> } else return <MinusOutlined /> }}
                        >
                            <Panel header={<span className="s17">SHIPPING - HANDLING</span>} key="1">
                                <p>Free Shipping on US orders over $20 USD and International orders over $100 USD</p><br />
                                <p>Please allow 1-3 business days for your order to be processed and shipped.</p>
                            </Panel>
                            <Panel header={<span className="s17">RETURNS</span>} key="2">
                                <p>USA Customers: Return within 30 days for a free exchange, refund, or gift card</p><br />
                                <p>Free Exchange: Select an item for exchange via our returns portal to avoid paying the return shipping cost!</p><br />
                                <p>Refund: Select a refund via our returns portal and $8.00 will be deducted for the return shipping label.</p>
                            </Panel>
                        </Collapse>
                    </div>
                    {/* <Alert
                        message="Success Text"
                        description="Success Description Success Description Success Description"
                        type="success"
                    /> */}
                </div>
            </div>
            <div className="row pt-5 mb-5 pb-3 bg-white" data-aos='fade-up'>
                <Tabs defaultActiveKey="3">
                    <TabPane key="3" tab={<h5 className="pl-2 pr-2">Reviews</h5>}>
                        <Review detail={detail} postComment={postComment} countStar={countStar} total={total} star={star} form={form} />
                    </TabPane>
                    <TabPane key="2" tab={<h5 className="pl-2 pr-2">Description</h5>}>
                        {!loading ? <p className="detail-description"> {detail.description} </p> :
                            <Skeleton active />}
                        <ProductList list={relatedProduct} title="Related Product" />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
export default DetailPage