import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../redux';
import axios from 'axios';
import { API_URL } from '../../../API/API';
import { setUserCart } from '../../../redux/action/user';
type UserInforFormProps = {
    list: [any],
    total: number,
    delivery: number,
    next(): void
}
const UserInforForm = ({ list, total, delivery, next }: UserInforFormProps) => {
    const dispatch = useDispatch()
    const user = useSelector((state: State) => state.user.userInfor)
    const [productList, setProductList] = useState([])
    const [form] = Form.useForm()
    const [disable, setDisable] = useState(true)
    useEffect(() => {
        setDisable(true)
        if (user.userId) {
            form.setFieldsValue({ ...user, name: `${user.lastName} ${user.firstName}` })
        }
        if (list.length) {
            setDisable(false)
            const arr: any = []
            list.map((item: any) => {
                arr.push({ 
                    productId: item._id, 
                    quantityInCart: item.quantityInCart, 
                    cost: item.saleOf? item.price * (100 - item.saleOf)/100 : item.price 
                })
            })
            setProductList(arr)
        }
    }, [list?.length, user.userId])
    const onFinish = (infor: any) => {
        const data = {
            ...infor,
            total,
            details: [...productList],
            delivery,
            userId: user.userId && user.userId
        }
        axios.post(`${API_URL}/bill/add`, data)
        .then(res => {
            if (res.data.success === true) {
                Modal.success({
                    title: 'Success',
                    onOk() {
                        form.resetFields()
                    }
                })
                dispatch(setUserCart([]))
                if(!localStorage.getItem("token"))
                localStorage.removeItem("cart")
                next()
            }
            else {
                Modal.error({
                    title: 'Error',
                    content: (
                        <p>Please try again</p>
                    )
                })
            }
        }).catch(err=>console.log(err))
    }
    return (
        <Form
        name="basic"
        className="mt-5"
        form={form}
        labelCol={{ xs: { span: 6 }, lg: { span: 6 } }}
        wrapperCol={{ xs: { span: 14 }, lg: { span: 16 } }}
        onFinish={onFinish}
    >
        <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
        >
            <Input disabled={disable} placeholder="Your name" />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input disabled={disable} placeholder="Your email"/>
        </Form.Item>
        <Form.Item
            label="Phone number"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
            <Input disabled={disable} placeholder="Your phone number"/>
        </Form.Item>
        <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
        >
            <Input disabled={disable} placeholder="Yout address"/>
        </Form.Item>
        <Form.Item wrapperCol={{ md: { offset: 6, span: 16 }, xs: { offset: 0, span: 24 } }}>
            <Button type="primary" htmlType="submit" size='large'>
                Submit
            </Button>
        </Form.Item>
    </Form>
    )
}
export default UserInforForm