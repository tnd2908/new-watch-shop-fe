import { Select, Result, Tooltip, notification, Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../../API/API'
import { State } from '../../redux'
import { decrease, increase, remove, setUserCart } from '../../redux/action/user'
import '../../styles/cart.css'
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { setDelivery, setTotal } from '../../redux/action/payment'
import { removeFromLocalStorage } from '../../Util/function'
import Payment from '../Payment/payment'
import PayPal from './Components/PayPal'
const { Option } = Select;

const Cart = () => {
    const userId = useSelector((state: State) => state.user.userInfor.userId)
    const cart: any = useSelector((state: State) => state.user.cart)
    const total: any = useSelector((state: State) => state.payment.total)
    const delivery: any = useSelector((state: State) => state.payment.delivery)
    const [subTotal, setSubTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [render, setRender] = useState(false)
    const dispatch = useDispatch()
    const getUserCart = () => {
        setLoading(true)
        axios.get(`${API_URL}/auth/cart/${userId}`)
            .then(res => {
                if (res.data.success == true && res.data.data.length) {
                    dispatch(setUserCart(res.data.data))
                    setLoading(false)
                }
                else setLoading(false)
            }).catch(err => console.log(err))
    }
    const removeItem = (id: any) => {
        const data = { productId: id }
        if (userId) {
            axios.put(`${API_URL}/auth/cart/${userId}`, data)
                .then(res => {
                    if (res.data.success == true) {
                        notification['success']({
                            message: 'Remove success',
                            description: 'Removed this item in your cart. Please check it out'
                        })
                        dispatch(remove(id))
                    }
                    else {
                        Modal.error({
                            title: 'Remove error'
                        })
                    }
                }).catch(err => console.log(err))
        }
        else {
            notification['success']({
                message: 'Remove success',
                description: 'Removed this item in your cart. Please check it out'
            })
            removeFromLocalStorage(id)
            dispatch(remove(id))
        }
    }
    useEffect(() => {
        if (cart.length >= 1) {
            let totalPrice = 0
            cart.map((item: any) => {
                if(item.saleOf != 0)
                return totalPrice += item.price * item.quantityInCart * (100 - item.saleOf)/100
                else
                return totalPrice += item.price * item.quantityInCart
            })
            setSubTotal(totalPrice)
            dispatch(setTotal(totalPrice + delivery))
        }
        else {
            (dispatch(setTotal(0)))
            setSubTotal(0)
        }
    }, [cart.length, delivery, render])
    const setCart = () => {
        if ( cart.length == 0 && localStorage.getItem('cart')?.length)
            dispatch(setUserCart(JSON.parse(localStorage.getItem('cart')!)))
        else return
    }
    useEffect(() => {
        userId && getUserCart()
        !userId && setCart()
    }, [userId])
    return (
        <div className="container-fluid cart-page bg-e">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 pt-3 ">
                        <div className="cart bg-white rounded">
                            <div className="w-100 cart-title d-flex justify-content-between align-items-center">
                                <h4>MY BAG</h4>
                                {cart.length > 1 && <h6> ({cart.length} items in your bag) </h6>}
                                {cart.length === 1 && <h6> ({cart.length} item in your bag) </h6>}
                                {cart.length === 0 && <h6> (0 item in your bag) </h6>}
                            </div>
                            {loading ? <div className="container-fluid">
                                <div className="row" style={{ borderTop: '1px solid #eee' }}>
                                    <div className="flex-mid w-100 h-50vh">
                                        <LoadingOutlined style={{ color: 'black', fontSize: '30px' }} />
                                    </div>
                                </div>
                            </div> : cart.length ? cart.map((item: any) => (
                                <div className="container-fluid">
                                    <div className="row cart-item">
                                        <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                                            <div className="cart-image">
                                                <img height={150} src={`${API_URL}/upload/${item.images[0]}`} />
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-4 pl-2 pr-2">
                                            {item.saleOf != 0 ? <h4 className="text-danger"> ${item.price * (100-item.saleOf)/100} </h4>:
                                                <h4 className="text-red"> ${item.price} </h4>
                                            }
                                            <h5> {item.name} </h5>
                                            <div className="edit-quantity d-flex">
                                                <p>Quantity:</p>
                                                <p className="text-dark"> {item.quantityInCart} </p>
                                            </div>
                                            <div className="btn-group">
                                                <button onClick={() => { dispatch(decrease(item._id)); setRender(!render) }}><i className="fal fa-minus"></i></button>
                                                <button onClick={() => { dispatch(increase(item._id)); setRender(!render) }}><i className="fal fa-plus"></i></button>
                                            </div>
                                            <Tooltip title='Remove item' placement="top">
                                                <button onClick={() => removeItem(item._id)} className="remove-btn">
                                                    <i className="fal fa-times"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            )) : <Result
                                        status="403"
                                        subTitle="Your cart is empty"
                                    />}
                        </div>
                        <div className="col-xl-12 mt-3">
                            <div className="delivery pt-3 pb-3 d-flex" style={{ backgroundColor: '#262626' }}>
                                <i className="fal fa-crown text-white"></i>
                                <div>
                                    <h5 className="text-white">PREMIER DELIVERY</h5>
                                    <p className="text-white">Get next-day delivery a whole year for only $15 </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 pb-2 pt-3">
                        <div className="w-100 h-100 bg-white rounded">
                            <div className="cart-title d-flex justify-content-between">
                                <h4>Total</h4>
                                <h4> ${total} </h4>
                            </div>
                            <div className="cart-total-price">
                                <div className="d-flex justify-content-between">
                                    <h6>Sub-total</h6>
                                    <p> ${subTotal} </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6>Delivery</h6>
                                    <p> {delivery == 0 ? 'Free' : `$${delivery}`} </p>
                                </div>
                                <div className="select w-100">
                                    <Select defaultValue={0}
                                        style={{ width: '100%', borderBottom: '1px solid silver' }}
                                        size="large"
                                        bordered={false}
                                        onChange={(e) => dispatch(setDelivery(e))}
                                    >
                                        <Option value={0}>Standard Delivery (Free)</Option>
                                        <Option value={10}>Fast Delivery <b>($10)</b></Option>
                                    </Select>
                                        <button disabled={total == 0} className="checkout-btn mb-3">USE VOUNCHER</button>
                                    <PayPal list = {cart} total={total}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-3">
                        <Payment />
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="delivery bg-white pt-3 pb-3 mt-3 d-flex shadow-sm">
                                    <i className="fal fa-truck-loading "></i>
                                    <div>
                                        <h5 >FREE STANDARD DELIVERY</h5>
                                        <p>Standard delivery options available to most cities for free</p>
                                        <Link to='/cart'>More Infor</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="delivery bg-white pt-3 pb-3 mt-3 d-flex shadow-sm" >
                                    <i className="fal fa-shipping-fast left-icon "></i>
                                    <div>
                                        <h5 >FAST DELIVERY</h5>
                                        <p >Fast delivery options available to most cities with $10</p>
                                        <Link to='/cart'>More Infor</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="delivery bg-white pt-3 pb-3 mt-3 d-flex shadow-sm">
                                    <i className="fal fa-hand-holding-box left-icon"></i>
                                    <div>
                                        <h5>FREE AND EASY RETURNS</h5>
                                        <p>Send it back within 28 days of recieving your order</p>
                                        <Link to='/cart'>More Infor</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart