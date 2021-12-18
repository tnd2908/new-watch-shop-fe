import { Form, Button, Input, Select } from 'antd';
import React, { useState } from 'react';
import PayPal from './PayPal';
type Props = {
    list: any,
    total: number
}
const PaymentForm = ({ list, total }: Props) => {
    const [form] = Form.useForm();
    const [payment, setPayment] = useState('COD')
    const onFinish = (data: any) => {
        console.log(data)
    }
    return (
        <Form
            name="basic"
            form={form}
            layout='vertical'
            onFinish={onFinish}
        >
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
                        label="Vouncher"
                        name="name"
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
                        label="Vouncher"
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