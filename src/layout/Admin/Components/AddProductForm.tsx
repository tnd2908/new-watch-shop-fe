import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Upload, Button, Select, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { API_URL } from '../../../API/API';
import axios from 'axios';
import productAPI from '../../../API/productAPI';
const { TextArea } = Input
const { Option } = Select
const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const AddProductForm = () => {
    
    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])
    const [color,setColor] = useState([])
    const onFinish = (data: any) => {
        const imgArr: string[] = []
        data.images.map((img: any) => imgArr.push(img.name))
        const { name, price, category, gender, description, quantity, color, material, weight, size, status } = data
        const product = {
            name,
            price,
            gender,
            description,
            category,
            quantity,
            color,
            status,
            material,
            weight,
            size,
            images: imgArr
        }
        console.log(product)
        try {
            axios.post(`${API_URL}/product/add-new`, product, {
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
                            }
                        })
                    }
                    else if (res.data.success == false) {
                        Modal.error({
                            title: 'Error',
                            content: (
                                <p> {res.data.message} </p>
                            )
                        })
                    }
                    console.log(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        productAPI.getColor().then(res=>setColor(res))
        productAPI.getCategory().then(res=>setCategories(res))
    },[])
    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={onFinish}
                className="p-4 shadow bg-white add-product-form mt-4"
                name="basic"
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: `Please input product's name` }]}
                            >
                                <Input placeholder="Product's name"/>
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: `Please select product's type` }]}
                            >
                                <Select placeholder="Category of product" style={{ width: '100%' }}>
                                    {categories.map((category: any)=>(
                                        <Option value ={category._id}> {category.name} </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-4">
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: `Please input product's price` }]}
                            >
                                <InputNumber placeholder="Product's price" style={{ width: '100%' }}/>
                            </Form.Item>
                        </div>
                        <div className="col-4">
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[{ required: true, message: 'Please input quantity' }]}
                            >
                                <InputNumber placeholder="Quantity" style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div className="col-4">
                            <Form.Item
                                name='color'
                                label="Color"
                                rules={[{ required: true, message: 'Please input color' }]}
                            >
                                <Select placeholder="Color" style={{ width: '100%' }}>
                                    {color.map((item: any)=>(
                                        <Option value ={item.name}> {item.name} </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name="status"
                                wrapperCol={{ span: 24 }}
                                labelCol={{ span: 24 }}
                                label="Status"
                                rules={[{ required: true, message: 'Please select status of product' }]}
                            >
                                <Select placeholder="Status" style={{ width: '100%' }}>
                                    <Option value="New">New</Option>
                                    <Option value="Hot">Hot</Option>
                                    <Option value="Normal">Normal</Option>
                                    <Option value="Hide">Hide</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-4">
                            <Form.Item
                                name="material"
                                wrapperCol={{ span: 24 }}
                                labelCol={{ span: 24 }}
                                label="Material"
                                rules={[{ required: true, message: 'Please select material of product' }]}
                            >
                                <Select placeholder="Material" style={{ width: '100%' }}>
                                    <Option value="Mineral Glass">Mineral Glass</Option>
                                    <Option value="Shapphire Crystal">Shapphire Crystal</Option>
                                    <Option value="Titanium">Titanium</Option>
                                    <Option value="Carbon">Carbon</Option>
                                    <Option value="Cloth">Cloth</Option>
                                    <Option value="Resin">Resin</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-4">
                            <Form.Item
                                name='weight'
                                label="Weight"
                                rules={[{ required: true, message: 'Please input weight' }]}
                            >
                                <Input placeholder="Weight" style={{ width: '100%' }} addonAfter={"g"} />
                            </Form.Item>
                        </div>
                        <div className="col-4">
                            <Form.Item
                                name='size'
                                label="Size of case"
                                rules={[{ required: true, message: 'Please input size' }]}
                            >
                                <Input placeholder="Size of case" style={{ width: '100%' }} addonAfter={"mm"} />
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input description' }]}
                            >
                                <TextArea placeholder="Description" rows={4} style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item
                                label="Image"
                                name="images"
                                getValueFromEvent={normFile}
                                valuePropName="fileList"
                                rules={[{ required: false, message: 'Please input image!' }]}
                            >
                                <Upload action={`${API_URL}/upload`} listType="picture-card">
                                    <div style={{ width: '250px' }}><PlusOutlined /></div>
                                </Upload>
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item
                                wrapperCol={{ offset: 10 }}
                            >
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    size="large"
                                    style={{ width: '30%' }}
                                > Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
}
export default AddProductForm