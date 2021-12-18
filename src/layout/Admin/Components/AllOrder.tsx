import { Button, message, Popconfirm, Radio, Table, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { listenerCount } from 'events';
import moment from 'moment'
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../API/API';
import { Order } from '../../../Util/spec';
import Bill from '../../User/Components/Bill';
const { Column } = Table
const AllOrder = () => {
    const [orderList, setOrderList] = useState([])
    const [visible, setVisible] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
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

    const showDetail = (data: Order) => {
        setOrder(data)
        setVisible(true)
    }
    const getOrder = () => {
        try {
            axios.get(`${API_URL}/bill`)
                .then(res => {
                    if (res.data.success === true) {
                        setOrderList(res.data.data)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    const filterList = (data: string) => {
        if (data === 'all') {
            getOrder()
        }
        axios.get(`${API_URL}/bill/status/${data}`)
            .then(res => {
                if (res.data.success === true) {
                    setOrderList(res.data.data)
                }
            }).catch((err) => console.log(err))
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
                    window.location.href = '/admin/order'
                }
            }).catch((err)=>message.error('Error, please try again'))
    }
    useEffect(() => {
        getOrder()
    }, [])
    return (
        <div>
            <div className="w-100">
                <Radio.Group onChange={(e) => filterList(e.target.value)} defaultValue="all" buttonStyle='solid'>
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="Waiting">Waiting</Radio.Button>
                    <Radio.Button value="In progress">In progress</Radio.Button>
                    <Radio.Button value="Completed">Completed</Radio.Button>
                    <Radio.Button value="Done">Done</Radio.Button>
                </Radio.Group>
            </div>
            <Modal className="modal-order" footer={null} width={450} visible={visible} onCancel={() => setVisible(false)} closable={true}>
                <Bill order={order} />
                {order.status === 'Waiting' &&
                    <div className="d-flex justify-content-end mt-3">
                        <Button style={{ marginRight: '10px' }} size='large' type="default">Deny</Button>
                        <Popconfirm
                            title="Do you want to accept this order?"
                            visible={isVisible}
                            onConfirm={() => confirm('In progress')}
                            onCancel={() => setIsVisible(false)}
                            okText="Ok"
                            cancelText="Cancle"
                        >
                            <Button onClick={() => setIsVisible(true)} size='large' type="primary">Accept</Button>
                        </Popconfirm>
                    </div>}
            </Modal>
            <Table className="mt-2" dataSource={orderList} bordered>
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
                            <button className="admin-btn-detail" onClick={() => showDetail(data)} >Detail</button>
                        </div>
                    )} />
            </Table>
        </div>
    );
};

export default AllOrder;