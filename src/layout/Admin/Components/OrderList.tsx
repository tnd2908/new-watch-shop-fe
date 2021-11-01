import { Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../API/API'
import moment from 'moment'
const {Column} = Table
const OrderList = () =>{
    const [orderList, setOrderList] = useState([])
    useEffect(()=>{
        try {
            axios.get(`${API_URL}/bill`)
                .then(res=>{
                    if(res.data.success == true ){
                        setOrderList(res.data.data)
                    }
                    console.log(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    },[])
    return(
        <div className="container-fluid pt-4">
            <div className="row">
            <Table dataSource={orderList} bordered>
                <Column title="Customer name" dataIndex="name" key="name" ellipsis={true} />
                <Column title="Phone" dataIndex="phone" key="phone" />
                <Column title="Total" key="total" render={data => (
                    <span>${new Intl.NumberFormat().format(data.total)}</span>
                )}/>
                <Column title="Status" dataIndex="status" key="status" />
                <Column title="Date" key="createAt" render={date =>(
                    <span> {moment(date.createAt).format('HH:mm DD/MM/YYYY')} </span>
                )} />
                <Column title="Action" key="action" width="90px"
                    render={action => (
                        <div className="d-flex">
                            <button className="admin-btn-detail">Detail</button>
                        </div>
                    )} />
            </Table>
            </div>
        </div>
    )
}
export default OrderList