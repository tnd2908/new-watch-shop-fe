import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Upload, Modal, Radio, Skeleton, Divider } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from '../../../API/API';
import axios from 'axios';
const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const AddCategory = () => {
    const [form] = Form.useForm()
    const [categoriesForMen, setCategoriesForMen] = useState([])
    const [categoriesForWomen, setCategoriesForWomen] = useState([])
    const [reRender, setReRender] = useState(false)
    const onFinish = (data: any) => {
        const avatar = data.image[0].name
        const { name, gender } = data
        const category = {
            name,
            avatar,
            gender
        }
        try {
            axios.post(`${API_URL}/category`, category, {
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
                })
        } catch (error) {
            console.log(error)
            Modal.error({
                title: 'Something happend'
            })
        }
    }
    useEffect(() => {
        try {
            axios.get(`${API_URL}/category`)
                .then(res => {
                    if (res.data.success == true) {
                        setCategoriesForMen(res.data.data.categoriesForMen)
                        setCategoriesForWomen(res.data.data.categoriesForWomen)
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }, [reRender])
    return (
        <div className="container-fluid pt-4">
            <div className="row justify-content-center bg-white pb-5">
                <div className="col-12 mt-4">
                    <Divider orientation="left">
                        <h4>Add new Category</h4>
                    </Divider>
                </div>
                <div className="col-12 mb-4">
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        onFinish={onFinish}
                        form={form}
                        className="bg-white p-4"
                    >
                        <Form.Item
                            label="Category name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your category name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Radio.Group >
                                <Radio value="Men">Men</Radio>
                                <Radio value="Women">Women</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Category image"
                            name="image"
                            getValueFromEvent={normFile}
                            valuePropName="fileList"
                            rules={[{ required: true, message: 'Please choose your image!' }]}
                        >
                            <Upload action={`${API_URL}/upload`} listType="picture" >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                            <Button type="primary" htmlType="submit">
                                Add category
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="col-12">
                    <Divider orientation="left">
                        <h4>For Men</h4>
                    </Divider>
                </div>
                {categoriesForMen.length ? categoriesForMen.map((category: any) => (
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 pt-2 pb-2 bg-white">
                        <div className="card category">
                            <img src={`${API_URL}/upload/${category.avatar}`} alt="" className="card-image" />
                            <div className="card-behind flex-mid">
                                <h6 className="text-white"> {category.name} </h6>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h6>Edit</h6>
                                    <h6><i className="fas fa-mars"></i></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <Skeleton />}
                <div className="col-12 mt-4">
                    <Divider orientation="left">
                        <h4>For Women</h4>
                    </Divider>
                </div>
                {categoriesForWomen.length ? categoriesForWomen.map((category: any) => (
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 pt-2 pb-2 bg-white">
                        <div className="card category">
                            <img src={`${API_URL}/upload/${category.avatar}`} alt="" className="card-image" />
                            <div className="card-behind flex-mid">
                                <h6 className="text-white"> {category.name} </h6>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h6>Edit</h6>
                                    <h6><i className="fas fa-venus"></i></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <Skeleton />}
            </div>
        </div>
    );
}
export default AddCategory