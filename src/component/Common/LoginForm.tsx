import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import logo from '../../assets/logo.png'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { userLogin } from "../../redux/action/user";
import { useDispatch } from 'react-redux';
const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const onFinish = (data: {}) => {
        axios.post('http://localhost:5050/auth/login', data)
            .then(res => {
                console.log(res.data)
                if (res.data.success === true && res.data.adminToken) {
                    localStorage.setItem('admin-token', res.data.adminToken)
                    history.push('/admin') 
                }
                else if(res.data.success === true && res.data.employeeToken) {
                    localStorage.setItem('employee', res.data.employeeToken)
                    history.push('/employee')
                }
                else if (res.data.success === true && res.data.accessToken) {
                    localStorage.setItem('token', res.data.accessToken)
                    dispatch(userLogin())
                    Modal.success({
                        title: 'Welcome to GSHOCK',
                        content: 'Login successfully',
                        onOk(){
                            history.push('/')
                        },
                        okButtonProps: {type: 'default'}
                    })
                }
                else Modal.error({
                    title: 'Login fail',
                    content: res.data.message,
                    okButtonProps: {type: 'default'}
                })
                
            })
    }
    return (
        <div className="login-form pw-4 pt-3 bg-white">
            <img src={logo} alt="" className="logo" />
            <h3 style={{ fontWeight: 'normal' }} className="mt-2"><i className="fas fa-user"></i>Login your Account</h3>
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
            >
                <div className="line"></div>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input size='large' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size='large' />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 22 }}
                >
                    <div className="d-flex justify-content-between switch-form">
                        <Link className="text-secondary" style={{ fontSize: '16px' }} to="/register">Forgot your password?</Link>
                        <Link className="text-dark" style={{ fontSize: '16px' }} to="/register">Don't have an account? <b> Register now</b></Link>
                    </div>
                </Form.Item>
                <Form.Item wrapperCol={{ lg:{offset: 5, span: 14}, sm: {offset: 0, span: 23}, xs: {offset: 0, span: 23} }}>
                    <Button type="primary" htmlType="submit" size='large' className="btn btn-dark" style={{ width: '100%' }}>Login</Button>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 23 }}>
                    <div className="line"></div>
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 23 }}
                >
                    <button className="btn-icon"><i className="fab fa-google"></i></button>
                    <button className="btn-icon"><i className="fab fa-facebook-f"></i></button>
                    <button className="btn-icon"><i className="fab fa-twitter"></i></button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default LoginForm