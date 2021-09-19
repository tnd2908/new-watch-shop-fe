import React from 'react';
import { Form, Input, Radio, Checkbox, InputNumber, Modal } from 'antd'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const API_URL: string = 'http://localhost:5050' 
const RegisterForm = () => {
    const [form] = Form.useForm()
    const history = useHistory()
    const onFinish = (data: any) =>{
        try {
            const {email, password, lastName, firstName, phone, gender} = data
            const infor: any ={
                email,
                password,
                lastName,
                firstName,
                phone,
                gender,
                role: 'customer'
            }
            axios.post(`${API_URL}/auth/register`, infor)
                .then(res=>{
                    if(res.data.success == true){
                        Modal.success({
                            title: "Success",
                            content: (
                                <p> {res.data.message} </p>
                            ),
                            onOk(){
                                form.resetFields()
                                history.push('/login')
                            }   
                        })
                    }
                    else{
                        Modal.error({
                            title: "Fail",
                            content: (
                                <p> {res.data.message} </p>
                            ), 
                        })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="register-form">
            <h3 style={{ fontWeight: 'normal' }} className="text-dark mt-2">Register new Account</h3>
            <Form
                name="basic"
                onFinish={onFinish}
                form={form}
                labelCol={{ lg: { span: 5 }, md: { span: 24 }, xs: { span: 24 } }}
                wrapperCol={{ lg: { span: 18 }, md: { span: 24 }, xs: { span: 24 } }}
                labelAlign="left"
            >
                <Form.Item wrapperCol={{ span: 23 }}>
                    <div className="line"></div>
                </Form.Item>
                <div className="container-fluid" style={{ padding: '10px' }}>
                    <div className="row" style={{ padding: '0' }}>
                        <div className="col-6" style={{ padding: '0' }}>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                labelAlign="left"
                                wrapperCol={{ lg: { span: 12 }, md: { span: 24 }, xs: { span: 24 } }}
                                labelCol={{ lg: { span: 10 }, md: { span: 24 }, xs: { span: 24 } }}
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input size='large' />
                            </Form.Item>
                        </div>
                        <div className="col-6" style={{ padding: '0' }}>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                labelAlign="left"
                                wrapperCol={{ lg: { span: 12 }, md: { span: 24 }, xs: { span: 24 } }}
                                labelCol={{ lg: { span: 10 }, md: { span: 24 }, xs: { span: 24 } }}
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input size='large' />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Radio.Group className="mb-2">
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="other">Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <InputNumber style={{width: '100%'}} size='large' />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input size='large' type="email" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size='large' />
                </Form.Item>
                <Form.Item
                    label="Confirm pw"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                              required: true,
                              message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                              validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                          return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                              },
                        }),
                  ]}
                >
                    <Input.Password size='large' />
                </Form.Item>
                <Form.Item 
                    wrapperCol={{ lg: { offset: 5, span: 14 }, xs: { span: 24 } }}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Checkbox>I agree with all the terms and conditions</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ lg: { offset: 5, span: 14 }, xs: { span: 24 } }}>
                    <button className="btn btn-dark" style={{ width: '100%' }}>Register</button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default RegisterForm