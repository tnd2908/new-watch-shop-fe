import { Button, notification, Rate, Result, Typography } from 'antd';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, } from "react-router-dom";
import { API_URL } from '../../../API/API';
import { State } from '../../../redux';
import { addToLocalStorage } from '../../../Util/function';
type ListProps = {
    list: [],
}
const {Paragraph}  = Typography
const ProductHorizontalList = ({ list }: ListProps) => {
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
        <div className="container-fluid product-horizontal-list mt-3">
            <div className="row">
                {list.length ? list.map((item: any) => (
                    <div className="col-12 pt-2 pb-2 box-item" key={item._id} style={{ padding: '0' }} >
                        <div className="box-image col-5 col-md-4">
                            <Link to={`/product/${item.name}`}><img src={`${API_URL}/upload/${item.images[0]}`} alt="" className="pd-image" /></Link>
                        </div>
                        <div className="box-body col-7 col-md-8">
                            <div className="product-information">
                                <Link to={`/product/${item.name}`}><h5> {item.name} </h5></Link>
                                {item.saleOf !== 0 ?
                                    <div className="d-flex">
                                        <p className="new-price"> ${item.price * (100 - item.saleOf) / 100} </p>
                                        <p className="old-price"> ${item.price} </p>
                                    </div>
                                    : <p className="price"> ${item.price} </p>
                                }
                                <div className="color-display">
                                    <h6 className="text-muted">Color: </h6>
                                    <p style={{ backgroundColor: ` ${item.color}` }} className="color-display"></p>
                                </div>
                                <Paragraph ellipsis={{rows: 2}} style={{color: 'silver'}}>
                                    {item.description}
                                </Paragraph>
                                <Rate disabled defaultValue={4} />
                            </div>
                            <div className="product-action d-flex">
                                <Button className="mt-1"><i className="fal fa-heart"></i></Button>
                                <Button className="mt-1 ml-1" onClick={() => addToCart(item)}><i className="fal fa-shopping-bag left-icon"></i>Add to bag</Button>
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
export default ProductHorizontalList