import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Steps, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux';
import { setNextStep, setPrevStep } from '../../redux/action/payment';
import axios from 'axios';
import { API_URL } from '../../API/API';
import { setUserCart } from '../../redux/action/user';
type UserInforFormProps = {
    list: [any],
    total: number,
    delivery: number
}
const UserInforForm = ({ list, total, delivery }: UserInforFormProps) => {
    const dispatch = useDispatch()
    const user = useSelector((state: State) => state.user.userInfor)
    const [productList, setProductList] = useState([])
    const [form] = Form.useForm()
    useEffect(() => {
        if (user.userId) {
            form.setFieldsValue({ ...user, name: `${user.lastName} ${user.firstName}` })
        }
        if (list.length) {
            const arr: any = []
            list.map((item: any) => {
                arr.push({ productId: item._id, quantityInCart: item.quantityInCart })
            })
            setProductList(arr)
        }
        console.log(list, total, delivery)
    }, [list?.length, user.userId])
    const onFinish = (infor: any) => {
        console.log('ascsa')
        const data = {
            ...infor,
            total,
            details: [...productList],
            delivery,
            userId: user.userId && user.userId
        }
        try {
            axios.post(`${API_URL}/bill/add`, data)
                .then(res => {
                    if (res.data.success == true) {
                        Modal.success({
                            title: 'Success',
                            onOk() {
                                form.resetFields()
                                dispatch(setNextStep())
                                dispatch(setUserCart([]))
                            }
                        })
                    }
                    else {
                        Modal.error({
                            title: 'Error',
                            content: (
                                <p>Please try again</p>
                            )
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid mt-5">
            <Form
                name="basic"
                form={form}
                labelCol={{ lg: { span: 4 }, md: { span: 24 } }}
                wrapperCol={{ lg: { span: 16 }, md: { span: 24 } }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone number"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ lg: { offset: 4, span: 16 }, md: { offset: 0, span: 24 } }}>
                    <Button htmlType="button" size='large'
                        onClick={() => dispatch(setPrevStep())}
                    >
                        Previous step
                    </Button>
                    <Button type="primary" htmlType="submit" size='large' className='ml-2'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default UserInforForm