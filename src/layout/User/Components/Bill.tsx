import React from 'react';
import { Order } from '../../../Util/spec';
import moment from 'moment'
import { Table, Tag, Typography } from 'antd';
const {Column} = Table
const {Paragraph} = Typography
type Props = {
    order: Order
}
const Bill = ({order}: Props) => {
    return (
        <div>
            <div className="order-detail-container">
                <div className="order-detail-status">
                    {order.status === 'Completed' &&
                        <div className="flex-mid flex-column">
                            <i className="fas fa-check-circle"></i>
                            <h3> ${order.total} </h3>
                            <p className="text-center">Your order has been accepted pease wait for the delivery</p>
                        </div>}
                    {order.status === 'Waiting' &&
                        <div className="flex-mid flex-column">
                            <i className="fas fa-clock"></i>
                            <h3> ${order.total} </h3>
                            <p className="text-center">Your order has been accepted pease wait for the delivery</p>
                        </div>}
                </div>
                <div className="container-fluid order-detail-user">
                    <div className="row">
                        <div className="col-5">Date:</div>
                        <div className="col-7">{moment(order.createAt).format('DD/MM/YYYY - HH:mm')}</div>
                        <div className="col-5">Status:</div>
                        <div className="col-7">
                            {order.status === 'Completed' && <Tag color="green"> {order.status} </Tag>}
                            {order.status === 'Waiting' && <Tag color="blue"> {order.status} </Tag>}
                            {order.status === 'In progress' && <Tag color="cyan"> {order.status} </Tag>}

                        </div>
                        <div className="col-5">Customer name:</div>
                        <div className="col-7"> {order.name} </div>
                        <div className="col-5">Email</div>
                        <div className="col-7"> <Paragraph style={{ marginBottom: 0 }} ellipsis={{ rows: 1 }}>{order.email}</Paragraph></div>
                        <div className="col-5">Phone</div>
                        <div className="col-7"> {order.phone} </div>
                        <div className="col-5">Address</div>
                        <div className="col-7"> {order.address} </div>
                    </div>
                </div>
                <Table dataSource={order.details} bordered pagination={false}>
                    <Column title="Product" key="productName" dataIndex="productName" />
                    <Column title="Quantity" key="quantityInCart" dataIndex="quantityInCart" width={50} />
                    <Column title="Cost" key="cost" render={data => (
                        <span>${new Intl.NumberFormat().format(data.cost)}</span>
                    )} />
                </Table>
                <div className="d-flex flex-column order-detail-infor">
                    <p>Sub Total: <span>${order.total / (100 - order.discount) * 100 - order.delivery}</span> </p>
                    <p>Discount: <span> {order.discount !== 0 ? `${order.discount}%` : 0}</span>  </p>
                    <p>Deliver: <span> {order.delivery !== 0 ? `$${order.delivery}` : 0}</span>  </p>
                    <p>Total: <span>${order.total} </span> </p>
                </div>
            </div>
        </div>
    );
};

export default Bill; 