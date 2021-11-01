import React, {  useState } from 'react'
import { Form, Button, Input, Modal, Radio, Divider } from 'antd'
import axios from 'axios';
import { SketchPicker } from 'react-color'
import { API_URL } from '../../../API/API';

const AddColor = () => {
    const [form] = Form.useForm()
    const [reRender, setReRender] = useState(false)
    const [colors, setColors] = useState('#ffffff')

    const onFinish = (data: any) => {
        try {
            axios.post(`${API_URL}/color/add`, data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('admin-token')}`
                }
            })
                .then(res => {
                    if (res.data.success == true) {
                        Modal.success({
                            title: 'Success',
                            content: (
                                <p> {res.data.message} </p>
                            ),
                            onOk() {
                                form.resetFields()
                                setReRender(!reRender)
                            }
                        })
                    }
                    else Modal.error({
                        title: `${res.data.message}`
                    })
                })
        } catch (error) {
            console.log(error)
            Modal.error({
                title: 'Something happend'
            })
        }
    }
    return (
        <div className="container-fluid pt-4">
            <div className="row justify-content-center bg-white pb-5">
                <div className="col-12 mt-4">
                    <Divider orientation="left">
                        <h4>Add new Color</h4>
                    </Divider>
                </div>
                <div className="col-12 mb-4">
                    <Form
                        name="basic"
                        layout="horizontal"
                        labelCol={{ span: 22, offset: 1 }}
                        labelAlign="left"
                        wrapperCol={{ span: 22, offset: 1 }}
                        onFinish={onFinish}
                        form={form}
                        className="bg-white p-4"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-3 mt-2">
                                    <SketchPicker color={colors} onChange={e => { setColors(e.hex); form.setFieldsValue({ ...form, color: colors }) }} />
                                </div>
                                <div className="col-xl-9 mt-2">
                                    <Form.Item
                                        name='color'
                                        label={<h5>Color</h5>}
                                        rules={[{ required: true, message: 'Please input color' }]}
                                    >
                                        <Input placeholder="Color" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ span: 22, offset: 1 }}>
                                        <Button type="primary" htmlType="submit">
                                            Create color
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default AddColor