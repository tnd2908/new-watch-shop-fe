import { Button, DatePicker, Form, Input, InputNumber, message, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { API_URL } from '../../../API/API';
import { Vouncher } from '../../../Util/spec';
const { Paragraph } = Typography
const AddVouncher = () => {
    const [form] = Form.useForm()
    const [vouncherList, setVouncherList] = useState<[Vouncher]>([{
        name: '',
        code: '',
        startDate: new Date(),
        endDate: new Date(),
        applyFor: 0,
        discount: 0,
        description: ''
    }])
    const onFinish = (data: Vouncher) => {
        try {
            axios.post(`${API_URL}/voucher`, data)
                .then(res => {
                    if (res.data.success === true) {
                        message.success(res.data.message)
                        form.resetFields()
                    }
                })
        } catch (error) {
            console.log(error)
            message.error('Fail')
        }
    }
    useEffect(()=>{
        try {
            axios.get(`${API_URL}/voucher`)
                .then(res=>{
                    if(res.data.success === true){
                        setVouncherList(res.data.data)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },[])
    return (
        <div className="container bg-white">
            <div className="row">
                <Form
                    name="basic"
                    onFinish={onFinish}
                    className='vouncher-form'
                    form={form}
                    style={{ backgroundColor: 'white', margin: '0 auto', maxWidth: '700px' }}
                    labelCol={{ lg: { span: 5 }, md: { span: 24 }, xs: { span: 24 } }}
                    wrapperCol={{ lg: { span: 18 }, md: { span: 24 }, xs: { span: 24 } }}
                    labelAlign="left">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[{ required: true, message: 'Please input code!' }]}
                    >
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item
                        label="Price form"
                        name="applyFor"
                        rules={[{ required: true, message: 'Please input code!' }]}
                    >
                        <InputNumber size='large' />
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input code!' }]}
                    >
                        <InputNumber size='large' />
                    </Form.Item>
                    <Form.Item
                        label="Start Date"
                        name="startDate"
                        rules={[{ required: true, message: 'Please input code!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="End Date"
                        name="endDate"
                        rules={[{ required: true, message: 'Please input code!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input code!' }]}
                    >
                        <Input.TextArea rows={3} size='large' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5 }}>
                        <Button type='primary' htmlType='submit' size='large'>Create</Button>
                    </Form.Item>
                </Form>
                {vouncherList.map((item: Vouncher)=>(
                    <div className="col-lg-6">
                    <div className="d-flex vouncher-box shadow-sm">
                        <div className="vouncher-box-left">
                            <p><i className="fal fa-gift left-icon"></i>Discount</p>
                            <h6> -{item.discount}% </h6>
                        </div>
                        <div className="vouncher-box-right">
                            <h6> {item.name} </h6>
                            <Paragraph ellipsis={{rows: 2}} style={{color: 'gray'}}> {item.description} </Paragraph>
                            <p>From {moment(item.startDate).format('DD/MM/YYYY')} to {moment(item.endDate).format('DD/MM/YYYY')}</p>
                            <h5> {item.code} </h5>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default AddVouncher;