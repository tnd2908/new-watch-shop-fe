import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../API/API';
import { State } from '../../../redux';
import { Button, Divider, Modal, Radio, Table, Tag, Typography } from 'antd'
import moment from 'moment'
import { Order } from '../../../Util/spec';
import Bill from './Bill';
const { Column } = Table
const { Paragraph } = Typography
const HistoryList = () => {
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
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
    const user = useSelector((state: State) => state.user.userInfor)
    const getDetail = (data: Order) => {
        setIsVisible(true)
        setOrder(data)
    }
    useEffect(() => {
        if (user.userId) {
            try {
                axios.get(`${API_URL}/auth/history/${user.userId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => {
                        if (res.data.success === true) {
                            console.log(res.data.data)
                            setIsLoading(false)
                            setList(res.data.data)
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }, [user.userId])
    return (
        <div>
            <Modal className="modal-order" footer={null} width={450} visible={isVisible} onCancel={() => setIsVisible(false)} closable={true}>
                <Bill order={order} />
            </Modal>
            <div className="p-2">
                <Divider orientation="left">
                    <h4>History</h4>
                </Divider>
                <Radio.Group>
                    <Radio.Button value="all" style={{ marginRight: '10px' }}>All</Radio.Button>
                    <Radio.Button value="30" style={{ marginRight: '10px' }}>30 days ago</Radio.Button>
                    <Radio.Button value="90" style={{ marginRight: '10px' }}>3 months ago</Radio.Button>
                    <Radio.Button className="mt-2" value="180">6 months ago</Radio.Button>
                </Radio.Group>
            </div>
            <Table dataSource={list} bordered pagination={false} loading={isLoading} className="user-order-list-table mt-3">
                <Column title="Action" key="action" width="0px"
                    render={data => (
                        <Button onClick={() => getDetail(data)}><i className="fal fa-eye"></i></Button>
                    )} />
                <Column title="Date" key="createAt" render={date => (
                    <span> {moment(date.createAt).format('HH:mm DD/MM/YYYY')} </span>
                )} />
                <Column title="Total" key="total" render={data => (
                    <span>${new Intl.NumberFormat().format(data.total)}</span>
                )} />
                <Column title="Status" key="status" width="0px" render={data => {
                    if (data.status === 'Completed')
                        return (
                            <Tag color="green"> {data.status} </Tag>
                        )
                    else return (
                        <Tag color="blue"> {data.status} </Tag>
                    )
                }} />
            </Table>
        </div>
    );
};

export default HistoryList;