import {  notification, Result, Tooltip } from 'antd';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link,  } from "react-router-dom";
import { API_URL } from '../../../API/API';
import { State } from '../../../redux';
import { addToLocalStorage } from '../../../Util/function';
type ListProps = {
    list: [],
}
const ProductVerticalList = ({ list }: ListProps) => {
    const user = useSelector((state: State) => state.user.userInfor.userId)
    const addToCart = (item: any) => {
        if (user) {
            try {
                const data = {
                    productId: item._id
                }
                axios.post(`${API_URL}/auth/cart/${user}`, data)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success === true) {
                            notification['success']({
                                message: 'Success',
                                description: (
                                    <div>
                                        <p> {res.data.message} </p>
                                    </div>
                                ),
                                placement: 'bottomRight'
                            })
                        }
                        else notification['error']({
                            message: 'Error',
                            description: (
                                <div>
                                    <p> {res.data.message} </p>
                                </div>
                            ),
                            placement: 'bottomRight'
                        })
                    })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            addToLocalStorage(item)
        }
    }
    return (
        <div className="container-fluid product-vertical-list mt-3">
            <div className="row">
                {list.length ? list.map((item: any) => (
                    <div className="col-6 col-xl-4 pt-2 pb-2 box-item" key={item._id} >
                        <div className="w-100">
                            <div className="box-image">
                                <Link to={`/product/${item.name}`}><img src={`${API_URL}/upload/${item.images[0]}`} alt="" className="pd-image" /></Link>
                                <div className="box-behind flex-mid flex-column">
                                    <Tooltip placement="left" title="Add to favourite">
                                        <button><i className="fal fa-heart"></i></button>
                                    </Tooltip>
                                    <Tooltip placement="left" title="More details">
                                        <Link to={`/product/${item.name}`}><button><i className="fal fa-eye"></i></button></Link>
                                    </Tooltip>
                                    <Tooltip placement="left" title="Add to bag">
                                        <button
                                            onClick={() => addToCart(item)}
                                        >
                                            <i className="fal fa-shopping-bag"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                {item.status !== 'Normal' ?
                                    <div className="pd-tag flex-mid">
                                        {item.status === 'Sale Off' ? <p> - {item.saleOf}% </p> : <p> {item.status} </p>}
                                    </div> : <></>
                                }
                            </div>
                            <div className="box-header">
                                <h6 className="text-muted">Color: </h6>
                                {item.color.includes(',') ? <p style={{ backgroundImage: `linear-gradient(150deg, ${item.color} 65%)` }}></p>
                                    : <p style={{ backgroundColor: ` ${item.color}` }}></p>}
                            </div>
                            <div className="box-body">
                                <Link to={`/product/${item._id}`}><h5> {item.name} </h5></Link>
                                {item.saleOf !== 0 ?
                                    <div className="d-flex align-items-end">
                                        <h6 className="new-price"> ${item.price * (100 - item.saleOf) / 100} </h6>
                                        <p className="old-price"> ${item.price} </p>
                                    </div>
                                    : <h6> ${item.price} </h6>
                                }
                            </div>
                        </div>
                    </div>
                )) : <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, there are 0 result! Please choose another category"
                    />}
            </div>
        </div >
    );
}
export default ProductVerticalList