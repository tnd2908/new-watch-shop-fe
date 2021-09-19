import { Form, Input } from 'antd'
import React, { Fragment } from 'react'
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
                if (res.data.success == true && res.data.adminToken) {
                    localStorage.setItem('admin-token', res.data.adminToken)
                    history.push('/admin')
                }
                else if (res.data.success == true && res.data.accessToken) {
                    localStorage.setItem('token', res.data.accessToken)
                    dispatch(userLogin())
                    history.push('/')
                }
            })
    }
    return (
        <div className="login-form pw-4 pt-3 bg-white">
            <img src={logo} alt="" className="logo" />
            <h3 style={{ fontWeight: 'normal' }} className="text-dark mt-2"><span className="icon-form"><i className="fas fa-user"></i></span>Login your Account</h3>
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
            >
                <Form.Item wrapperCol={{ span: 23 }}>
                    <div className="line"></div>
                </Form.Item>
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
                    <div className="d-flex justify-content-between">
                        <Link className="text-secondary" style={{ fontSize: '16px' }} to="/register">Forgot your password?</Link>
                        <Link className="text-dark" style={{ fontSize: '16px' }} to="/register">Don't have an account? <b> Register now</b></Link>
                    </div>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
                    <button className="btn btn-dark" style={{ width: '100%' }}>Login</button>
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