import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../../API/API'
import { State } from '../../redux'
import { setCategoriesForMen, setCategoriesForWomen } from '../../redux/action/category'
import logo from '../../assets/logo-black.png'
import { Button, Input } from 'antd'
import { useLocation } from 'react-router-dom'
const Footer = () => {
    const categoriesForMen: [] = useSelector((state: State) => state.category.categoriesForMen)
    const categoriesForWomen: [] = useSelector((state: State) => state.category.categoriesForWomen)
    const location = useLocation()
    const dispatch = useDispatch()
    const getCate = () => {
        try {
            axios.get(`${API_URL}/category`)
                .then(res => {
                    if (res.data.success == true) {
                        dispatch(setCategoriesForMen(res.data.data.categoriesForMen))
                        dispatch(setCategoriesForWomen(res.data.data.categoriesForWomen))
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (!categoriesForWomen.length || !categoriesForMen.length)
            getCate()
    }, [])
    if (location.pathname.startsWith('/admin'))
    return <></>
    else
    return (
        <div className="container-fluid footer">
            <div className="container pt-5 pb-5 ">
                <div className="row">
                    <div className="col-lg-2">
                        <img src={logo} alt="" className="logo-small" />
                    </div>
                    <div className="col-6 col-lg-2">
                        <h6 className="tw"> For Men</h6>
                        {categoriesForMen.map((item: any) => (
                            <p key={item._id} className="ts"> {item.name} </p>
                        ))}
                    </div>
                    <div className="col-6 col-lg-2">
                        <h6 className="tw"> For Women</h6>
                        {categoriesForWomen.map((item: any) => (
                            <p key={item._id} className="ts"> {item.name} </p>
                        ))}
                    </div>
                    <div className="col-lg-2">
                        <h6 className="text-white">Helps</h6>
                        <p className="ts">Contact us</p>
                        <p className="ts">Support</p>
                        <p className="ts">FAQs</p>
                        <p className="ts">Privacy</p>
                        <p className="ts">Legal</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-flex flex-column">
                            <h4 className="tw">Follow us</h4>
                            <div className="d-flex">
                                <div className="media-icon"><i className="fab fa-facebook-f"></i></div>
                                <div className="media-icon"><i className="fab fa-twitter"></i></div>
                                <div className="media-icon"><i className="fab fa-pinterest-p"></i></div>
                                <div className="media-icon"><i className="fab fa-instagram"></i></div>
                                <div className="media-icon"><i className="fab fa-youtube"></i></div>
                            </div>
                        </div>
                        <h6 className="tw mt-5">SIGN UP FOR OUR NEWSLETTER</h6>
                        <Input.Search
                            size="large"
                            placeholder="Enter your email"
                            enterButton={
                            <Button type="primary">
                                <p className="text-btn">Subcribe</p>
                        </Button>} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer