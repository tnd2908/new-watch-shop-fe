import { Form, Button, Input, Select, Result, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../API/API';
import { FastDelivery, Insurance, Order, StandardDelivery } from '../../../Decorator/decorator';
import { State } from '../../../redux';
import { Detail } from '../../../Util/spec';
import PayPal from './PayPal';
type Props = {
    list: Array<Detail>,
    total: number,
    closeForm(): void
}
const { Option } = Select
interface IOrder {
    getPrice(): number
}
const PaymentForm = ({ list, total, closeForm}: Props) => {
    const [form] = Form.useForm();
    const user = useSelector((state: State) => state.user.userInfor)
    const userId = useSelector((state: State) => state.user.userInfor.userId)
    const [visible, setVisible] = useState(false)
    const orderWithInsurance = new Order(list)
    const [order, setOrder] = useState<IOrder>(new Insurance(orderWithInsurance))
    const [payment, setPayment] = useState('COD')
    const [voucher, setVoucher] = useState('')
    const [delivery, setDelivery] = useState(0)
    const onFinish = (data: any) => {
        const product = list[0]
        const { name, email, address, phone } = data
        const details = [{
            productName: product.name,
            quantityInCart: 1,
            cost: product.saleOf ? product.price * (100 - product.saleOf) / 100 : product.price,
            productId: product._id
        }]
        const bill = {
            name,
            email,
            phone,
            address,
            details,
            discount: 0,
            status: 'Waiting',
            delivery,
            total: order.getPrice(),
            voucher: voucher && voucher,
            userId: userId && userId
        }
        axios.post(`${API_URL}/bill/add`, bill)
            .then(res => {
                if (res.data.success === true) {
                    closeForm()
                    setVisible(true)
                }
                else{
                    closeForm()
                    Modal.error({
                        title: 'Error',
                        content: 'Please try again'
                    })
                } 
            })
        .catch(err => Modal.error({
            title: 'Error',
            content: 'Please try again'
        }))
    }
    useEffect(() => {
        form.setFieldsValue({ ...user, name: `${user.lastName} ${user.firstName}`, payment: 'COD', delivery: 'standard' })
    }, [userId])
    const onDeliveryChange = (delivery: string) => {
        if (delivery === 'standard') {
            const standard = new StandardDelivery(order)
            setDelivery(standard.cost)
            setOrder(standard)
        }
        if (delivery === 'fast') {
            const fast = new FastDelivery(order)
            setDelivery(fast.cost)
            setOrder(fast)
        }
    }
    return (
        <Form
            name="basic"
            form={form}
            layout='vertical'
            onFinish={onFinish}
        >
            <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
                <div className="w-100 h-50vh flex-mid">
                    <Result
                        status="success"
                        title="Successfully Purchased Cloud Server ECS!"
                        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                        extra={[
                            <Link to='/'><Button size='large' type="primary" key="console">
                                Back to Home
                            </Button></Link>,
                            <Link to='/product?page=1'><Button key="console" size='large'>
                                Buy again
                            </Button></Link>,
                        ]}
                    />
                </div>
            </Modal>
            <Form.Item
                label="Select your payment"
                name="payment"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Select style={{ width: '100%' }} defaultValue={payment} onChange={(e) => setPayment(e)} size='large'>
                    <Select.Option value='COD'>COD</Select.Option>
                    <Select.Option value='Paypal'>Paypal</Select.Option>
                    <Select.Option disabled value='Momo'>Momo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Select Delivery"
                name="delivery"
                rules={[{ required: true, message: 'Please input your name!' }]}>
                <Select defaultValue={'standard'}
                    style={{ width: '100%', borderBottom: '1px solid silver', marginBottom: '15px' }}
                    size="large"
                    bordered={false}
                    onChange={(e) => onDeliveryChange(e)}
                >
                    <Option value={'standard'}>Standard Delivery (Free)</Option>
                    <Option value={'fast'}>Fast Delivery <b>($10)</b></Option>
                </Select>
            </Form.Item>
            {payment === 'COD' &&
                <>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input size='large' placeholder="Your name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input size='large' placeholder="Your email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input size='large' placeholder="Your phone number" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input size='large' placeholder="Yout address" />
                    </Form.Item>
                    <Form.Item
                        label="Voucher"
                        name="voucher"
                        rules={[{ required: false, message: 'Please input your name!' }]}
                    >
                        <Input size='large' placeholder="Vouncher" />
                    </Form.Item>
                    <button className="btn btn-danger mb-4" type="button">Apply vouncher</button>
                    <Form.Item >
                        <Button type='primary' htmlType="submit" size='large' style={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </>}
            {payment === 'Paypal' &&
                <>
                    <Form.Item
                        label="Voucher"
                        name="name"
                        rules={[{ required: false, message: 'Please input your name!' }]}
                    >
                        <Input size='large' placeholder="Vouncher" />
                    </Form.Item>
                    <button className="btn btn-danger mb-4">Apply vouncher</button>
                    <Form.Item >
                        <PayPal list={list} total={total} />
                    </Form.Item>
                </>}
        </Form>
    );
};

export default PaymentForm;