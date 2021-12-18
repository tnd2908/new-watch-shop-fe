import React, { useEffect } from 'react';
import { Form, Input, Button, InputNumber, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { State } from '../../../redux';
const Profile = () => {
    const [form] = Form.useForm()
    const user = useSelector((state: State)=> state.user.userInfor)
    useEffect(()=>{
        form.setFieldsValue({...user})
    },[user.userId])
    return (
        <div>
            <div className="p-2">
                <Divider orientation="center">
                    <h4>Profile</h4>
                </Divider>
            </div>
            <div className="user-information-container">
                
            </div>
            <Form
                name="basic"
                form={form}
                labelAlign="right"
                className="p-2"
                layout="vertical"
                style={{maxWidth:'800px', margin:'0 auto'}}
            >
                <div className="container-fluid" style={{ padding: '10px',paddingBottom:'0'  }}>
                    <div className="row" style={{ padding: '0'}}>
                        <div className="col-6" style={{ padding: '0', paddingRight:'5px' }}>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                colon={false}
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input size='large'/>
                            </Form.Item>
                        </div>
                        <div className="col-6" style={{ padding: '0', paddingLeft:'5px' }}>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input size='large'/>
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <InputNumber style={{width: '100%'}} size='large'/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input size='large' type="email"/>
                </Form.Item>
                <Form.Item wrapperCol={{ lg: { offset: 16, span: 8 }, xs: { span: 24 } }}>
                    <Button htmlType="submit" size='large' type="primary" className="btn btn-dark" style={{ width: '100%' }}>Update</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;