import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../../API/API'
import { State } from '../../redux'
import { setCategoriesForMen, setCategoriesForWomen } from '../../redux/action/category'
import logo from '../../assets/logo-black.png'
import { Button, Divider, Input } from 'antd'
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
            <div className="container-fluid footer" >
                <div className="container pt-3 pb-5 ">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="d-flex flex-column">
                                <h5 className="tw">Follow us</h5>
                                <div className="d-flex">
                                    <div className="media-icon"><i className="fab fa-facebook-f"></i></div>
                                    <div className="media-icon"><i className="fab fa-twitter"></i></div>
                                    <div className="media-icon"><i className="fab fa-pinterest-p"></i></div>
                                    <div className="media-icon"><i className="fab fa-instagram"></i></div>
                                    <div className="media-icon"><i className="fab fa-youtube"></i></div>
                                </div>
                                <p className="text-white mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam modi fugit, assumenda cumque, debitis mollitia rem voluptatum, voluptatibus aliquam dignissimos quae maxime quia ipsum maiores accusantium enim ipsa culpa. Repudiandae.</p>
                            </div>
                            <h6 className="tw mt-5">SIGN UP FOR OUR NEWSLETTER</h6>
                            <Input.Search
                                size="large"
                                placeholder="Enter your email"
                                style={{ maxWidth: '500px' }}
                                enterButton={
                                    <Button type="primary" style={{ backgroundColor: "#262626", border: '1px solid #262626' }}>
                                        <p className="text-btn">Subcribe</p>
                                    </Button>} />
                        </div>
                        <div className="col-lg-4 d-flex align-items-center">
                            <iframe className="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.463577157704!2d106.66529475092798!3d10.775762592284295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0xdee5c99a7b02feab!2sHuflit!5e0!3m2!1svi!2s!4v1635573181978!5m2!1svi!2s" style={{ height: '250px', width: '100%' }} loading="lazy"></iframe>
                        </div>
                    </div>
                    <div className="row mt-4">
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
                            <h6 className="text-white">HELPS</h6>
                            <p className="ts">Support</p>
                            <p className="ts">FAQs</p>
                            <p className="ts">Privacy</p>
                            <p className="ts">Legal</p>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex flex-column">
                                <h6 className="text-white">CONTACT US</h6>
                                <p className="tw-large"><i className="fal fa-mail-bulk left-icon"></i>tnd.290800@gmail.com</p>
                                <p className="tw-large"><i className="fal fa-phone left-icon"></i>+84.909.956.627</p>
                                <p className="tw-large"><i className="fal fa-map-marker-alt left-icon"></i>100 Su Van Hanh Ho Chi Minh city</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-end">
                    <p>Copyright 2021<i className="fal fa-copyright"></i> Tran Nhat Dan</p>
                </div>
            </div>
        );
}
export default Footer