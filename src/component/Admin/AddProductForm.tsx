import React from 'react';
import { Form, Input, InputNumber, Upload, Button, Space, Select } from 'antd'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { API_URL } from '../../API/API';
const { TextArea } = Input
const {Option} = Select
const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
const AddProductForm = () => {
    const onFinish = (data: any) => {
        const imgArr: string[] = []
        // data.images.map((img: any) => imgArr.push(img.name))
        // const { name, price } = data
        // const product = {
        //     name,
        //     price,
        //     images: imgArr
        // }
        // console.log(product)
        console.log(data)
    }
    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            className="p-4 shadow"
            name="dynamic_form_nest_item"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Image"
                name="images"
                getValueFromEvent={normFile}
                valuePropName="fileList"
                rules={[{ required: false, message: 'Please input your username!' }]}
            >
                <Upload action={`${API_URL}/upload`} listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                wrapperCol={{ span: 12 }}
                label="Details"
            >
                <Form.List name="details">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <div key={key} style={{ marginBottom: 8 }}>
                                    <h6 className="mt-2" style={{textAlign: 'right'}}>New Product </h6>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'color']}
                                        fieldKey={[fieldKey, 'color']}
                                        labelCol={{ span: 24 }}
                                        label="Color"
                                        wrapperCol={{ span: 24 }}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="Color" style={{width: '100%'}} />
                                    </Form.Item>
                                    <Space>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}
                                            fieldKey={[fieldKey, 'quantity']}
                                            wrapperCol={{ span: 24 }}
                                            labelCol={{ span: 24 }}
                                            label="Quantity"
                                            rules={[{ required: true, message: 'Missing last name' }]}
                                        >
                                            <InputNumber placeholder="Quantity" style={{width: '100%'}}/>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'status']}
                                            fieldKey={[fieldKey, 'status']}
                                            wrapperCol={{ span: 24 }}
                                            labelCol={{ span: 24 }}
                                            label="Status"
                                            rules={[{ required: true, message: 'Missing last name' }]}
                                        >
                                            <Select placeholder="Status" style={{width: '100%'}}>
                                                <Option value="New">New</Option>
                                                <Option value="Hot">Hot</Option>
                                                <Option value="Normal">Normal</Option>
                                            </Select>
                                        </Form.Item>
                                    </Space>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'description']}
                                        fieldKey={[fieldKey, 'description']}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        label="Description"
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <TextArea placeholder="Description" rows={4} style={{width: '100%'}}/>
                                    </Form.Item>
                                    <Button className="text-danger" type="text" onClick={() => remove(name)}><i className="fal fa-minus-circle left-icon"></i>Remove field</Button>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<i className="fal fa-plus left-icon"></i>}>
                                    Add details
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
            <Form.Item
                wrapperCol={{ offset: 6 }}
            >
                <Button htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
}
export default AddProductForm