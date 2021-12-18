import { Button, message, Popconfirm, Table, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../API/API'
import moment from 'moment'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
import Avatar from 'antd/lib/avatar/avatar'
import { Detail, Order } from '../../../Util/spec'
import Modal from 'antd/lib/modal/Modal'
import Bill from '../../User/Components/Bill'
Chart.register(CategoryScale)
const { Column } = Table

const OrderList = () => {
    const [orderList, setOrderList] = useState([])
    const [productList, setProductList] = useState([])
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const [order, setOrder] = useState<Order>({
        status: 'Waiting',
        total: 0,
        name: '',
        phone: 0,
        _id: '',
        details: [{ productId: '', quantityInCart: 0, cost: 0, productName: '' }],
        delivery: 0,
        address: '',
        email: '',
        discount: 0,
    })
    const [visible, setVisible] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        try {
            axios.get(`${API_URL}/bill`)
                .then(res => {
                    if (res.data.success === true) {
                        setOrderList(res.data.data)
                    }
                })
            axios.get(`${API_URL}/product/sale/best-saling`)
                .then(res => {
                    if (res.data.success === true) {
                        setProductList(res.data.data)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    const showDetail = (detail: Order) => {
        setOrder(detail)
        setVisible(true)
    }
    const confirm = (status : string) => {
        const data = {
            id: order._id,
            details: order.details,
            status
        }
        axios.put(`${API_URL}/bill/update`, data)
            .then(res=>{
                if(res.data.success === true){
                    setIsVisible(false)
                    setVisible(false)
                    message.success(res.data.message)
                    window.location.href = '/admin'
                }
            }).catch((err)=>message.error('Error, please try again'))
    }
    return (
        <div className="container-fluid pt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="box-report box-1">
                        <div>
                            <h6>Revenue</h6>
                            <h4>$23.000</h4>
                        </div>
                        <i className="fal fa-coin"></i>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="box-report box-2">
                        <div>
                            <h6>Order</h6>
                            <h4> {orderList.length} </h4>
                        </div>
                        <i className="fal fa-clipboard-list"></i>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="box-report box-3">
                        <div>
                            <h6>Date</h6>
                            <h4> {date} </h4>
                        </div>
                        <i className="fal fa-calendar-alt"></i>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="box-report box-4">
                        <div>
                            <h6>Message</h6>
                            <h4> 0 </h4>
                        </div>
                        <i className="fal fa-comment"></i>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="bg-white rounded p-2">
                        <h5 className="mb-3 mt-3">Revenue</h5>
                        <Bar data={{
                            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                            // ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            datasets: [{
                                data: [39000, 70000, 55000, 46000, 28000, 90000],
                                borderWidth: 1,
                                label: 'Month',
                                backgroundColor: [
                                    '#ff4d4f',
                                    '#1890ff',
                                    '#fadb14',
                                    '#b7eb8f',
                                    'orange',
                                ]
                            }]
                        }} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white rounded p-2">
                        <h5 className="mb-3 mt-3">Best selling</h5>
                        <Doughnut data={{
                            labels: productList.map((item: Detail) => item.name),
                            datasets: [{
                                data: productList.map((item: Detail) => item.saled),
                                borderWidth: 1,
                                backgroundColor: [
                                    '#ff4d4f',
                                    '#1890ff',
                                    '#fadb14',
                                    '#b7eb8f',
                                    'orange',
                                ]
                            }],
                        }} />
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-8">
                    <div className="bg-white p-2">
                        <Modal className="modal-order" footer={null} width={450} visible={visible} onCancel={() => setVisible(false)} closable={true}>
                            <Bill order={order} />
                            {order.status === 'Waiting' &&
                                <div className="d-flex justify-content-end mt-3">
                                    <Button style={{ marginRight: '10px' }} size='large' type="default">Deny</Button>
                                    <Popconfirm
                                        title="Do you want to accept this order?"
                                        visible={isVisible}
                                        onConfirm={()=>confirm('In progress')}
                                        onCancel={() => setIsVisible(false)}
                                        okText="Ok"
                                        cancelText="Cancle"
                                    >
                                        <Button onClick={()=>setIsVisible(true)} size='large' type="primary">Accept</Button>
                                    </Popconfirm>
                                </div>}
                        </Modal>
                        <h5 className="mb-3 mt-3">Recent Order</h5>
                        <Table dataSource={orderList} bordered>
                            <Column title="Customer name" dataIndex="name" key="name" ellipsis={true} />
                            <Column title="Total" key="total" render={data => (
                                <span>${new Intl.NumberFormat().format(data.total)}</span>
                            )} />
                            <Column title="Status" key="status" render={data => {
                                if (data.status === "Waiting") {
                                    return (
                                        <Tag color={"blue"}> {data.status} </Tag>
                                    )
                                }
                                else if (data.status === "Completed") {
                                    return (
                                        <Tag color={"green"}> {data.status} </Tag>
                                    )
                                }
                                else if (data.status === "In progress") {
                                    return (
                                        <Tag color={"cyan"}> {data.status} </Tag>
                                    )
                                }
                            }}
                            />
                            <Column title="Date" key="createAt" render={date => (
                                <span> {moment(date.createAt).format('HH:mm DD/MM/YYYY')} </span>
                            )} />
                            <Column title="Action" key="action" width="90px"
                                render={(data) => (
                                    <div className="d-flex">
                                        <button className="admin-btn-detail" onClick={() => showDetail(data)}>Detail</button>
                                    </div>
                                )} />
                        </Table>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-2">
                        <h5 className="mb-3 mt-3">Recent Customer</h5>
                        <Table dataSource={orderList} bordered>
                            <Column width={70} title="Total" key="total" render={() => (
                                <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                            )} />
                            <Column title="Name" dataIndex="name" key="name" ellipsis={true} />
                            <Column title="Email" dataIndex="email" key="email" ellipsis={true} />
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderList