import React, {createElement, useEffect, useState} from 'react'
import { Avatar, Button, Comment, Divider, Form, Input, Progress, Rate, Tooltip } from 'antd';
import moment from 'moment'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
type Props = {
    postComment: any,
    detail: Detail,
    countStar: any,
    total: number,
    star: number
}

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
const Review = ({postComment, detail, countStar, total, star}: Props) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState<any>(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };
    const [form] = Form.useForm()
    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };
    useEffect(()=>{
        form.setFieldsValue({star: star})
    },[])
    return (
        <div className="container shadow-sm mb-5 pb-3" data-aos='fade-up'>
            <div className="row mt-3">
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
                                    <h6><Rate disabled defaultValue={5} count={5} className="star" /></h6>
                                    <Progress percent={countStar.fiveStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.fiveStar} vote`} />
                                </div>
                                <div className="d-flex">
                                    <h6><Rate disabled defaultValue={4} count={4} className="star" /></h6>
                                    <Progress percent={countStar.fourStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.fourStar} vote`} />
                                </div>
                                <div className="d-flex">
                                    <h6><Rate disabled defaultValue={3} count={3} className="star" /></h6>
                                    <Progress percent={countStar.threeStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.threeStar} vote`} />
                                </div>
                                <div className="d-flex">
                                    <h6><Rate disabled defaultValue={2} count={2} className="star" /></h6>
                                    <Progress percent={countStar.twoStar * (100 / detail.comment.length)} strokeColor='#bfbfbf' format={() => `${countStar.twoStar} vote`} />
                                </div>
                                <div className="d-flex">
                                    <h6><Rate disabled defaultValue={1} count={1} className="star" /></h6>
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
                        <h5>Your rating </h5>
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
            <Divider orientation='left'><h6> ({detail.comment!.length} Reviews)</h6></Divider>
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
                                        <Rate disabled defaultValue={item.star} className="star" />
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
    )
}
export default Review