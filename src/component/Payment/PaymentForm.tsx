import React, { useEffect, useState } from 'react'
import { Form, Input, Button, DatePicker, Radio, Space } from 'antd';
import { useDispatch} from 'react-redux';
import { setNextStep } from '../../redux/action/payment';
type UserInforFormProps = {
    list?: [],
}
const PaymentForm = ({ list }: UserInforFormProps) => {
    const dispatch = useDispatch()
    const onFinish = (data: any) => {
        dispatch(setNextStep())
    }
    const [payment, setPayment] = useState('Momo')
    useEffect(() => {

    }, [list?.length])
    return (
        <div className="container-fluid mt-5 mb-3">
            <div className="row">
                <div className="col-lg-8">
                    <Form
                        name="basic"
                        layout='vertical'
                        labelCol={{ lg: { span: 21, offset: 1 }, md: { span: 24, offset: 0 } }}
                        wrapperCol={{ lg: { span: 21, offset: 1 }, md: { span: 24, offset: 0 } }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Pay with"
                            name="payment"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Radio.Group defaultValue='Momo' onChange={(e) => setPayment(e.target.value)}>
                                <Space direction='horizontal'>
                                    <Radio value='Cast'>Cash</Radio>
                                    <Radio value='Momo'>Momo</Radio>
                                    <Radio value='Visa'>Visa</Radio>
                                    <Radio value='Stripe'>Stripe</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        {payment !== 'Cast' && <div className='container-fluid' style={{ padding: '0' }}>
                            <div className="row">
                                <div className="col-12">
                                    <Form.Item
                                        labelCol={{ lg: { span: 21, offset: 1 }, md: { span: 24, offset: 0 } }}
                                        wrapperCol={{ lg: { span: 21, offset: 1 }, md: { span: 24, offset: 0 } }}
                                        label="Card Number"
                                        name="cardNumber"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input size='large' />
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <Form.Item
                                        labelCol={{ lg: { span: 21, offset: 1 }, md: { span: 24, offset: 0 } }}
                                        wrapperCol={{ lg: { span: 21, offset: 1 }, md: { span: 24, offset: 0 } }}
                                        label="Card CVC"
                                        name="cvc"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input size='large' />
                                    </Form.Item>
                                </div>
                                <div className="col-md-6">
                                    <Form.Item
                                        label="Exp month"
                                        name="expMonth"
                                        labelCol={{ lg: { span: 21, offset: 2 }, md: { span: 24, offset: 0 } }}
                                        wrapperCol={{ lg: { span: 21, offset: 2 }, md: { span: 24, offset: 0 } }}
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <DatePicker picker='month' style={{width: '100%'}} size='large'/>
                                    </Form.Item>
                                </div>
                                <div className="col-md-6">
                                    <Form.Item
                                        label="Exp year"
                                        name="expYear"
                                        labelCol={{ lg: { span: 20, offset: 0 }, md: { span: 24, offset: 0 } }}
                                        wrapperCol={{ lg: { span: 20, offset: 0 }, md: { span: 24, offset: 0 } }}
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <DatePicker picker='year' style={{width: '100%'}} size='large'/>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>}
                        <Form.Item wrapperCol={{ lg: { offset: 1, span: 21 }, md: { offset: 0, span: 24 } }}>
                            <Button type="primary" htmlType="submit" size='large' style={{width:'150px'}}>
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="col-lg-4 payment-advertise">
                    <h4><b>Please select your method of payment</b></h4>
                    <img src="https://www.pngkit.com/png/full/208-2082432_payment-icons-collection-devacron-credit-card-icons-transparent.png" alt="" />
                </div>
            </div>
        </div>
    )
}
export default PaymentForm