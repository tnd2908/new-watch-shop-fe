import React, { useEffect, useState } from 'react'
import Banner from '../../component/Home/Banner'
import ProductList from '../../component/Home/ProductList'
import axios from "axios";
import { API_URL } from "../../API/API";
import { useDispatch, useSelector } from "react-redux";
import { setProductHotList, setProductNewList } from "../../redux/action/product";
import { State } from "../../redux";
import 'aos/dist/aos.css'
import Aos from 'aos'
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
const HomePage = () => {
    const dispatch = useDispatch()
    const productNewList: [] = useSelector((state: State) => state.product.productNewList)
    const productHotList: [] = useSelector((state: State) => state.product.productHotList)

    const getProductList = () => {
        try {
            axios.get(`${API_URL}/product/status/New?page=1`)
                .then(res => {
                    if (res.data.success == true) {
                        dispatch(setProductNewList(res.data.data))
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getProductHotList = () => {
        try {
            axios.get(`${API_URL}/product/status/Hot?page=1`)
                .then(res => {
                    if (res.data.success == true) {
                        dispatch(setProductHotList(res.data.data))
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        !productNewList.length && getProductList()
        !productHotList.length && getProductHotList()
        Aos.init({ duration: 600 })
    }, [])
    return (
        <div className="container-fluid component-top" >
            <div className="row">
                <Banner />
            </div>
            <div className="container ">
                <div className="row">
                    <Link to='/product?page=1' data-aos='fade-up' data-aos-offset={60} className="col-md-6 medium-image mt-4 ">
                        <img src="https://bizweb.dktcdn.net/100/410/920/products/mtg-b2000d-1a-theme-3-2048x2048.jpg?v=1613797562820" alt="" />
                        <h3>For Men</h3>
                    </Link>
                    <Link to='/product?page=1' data-aos='fade-up' data-aos-offset={60} className="col-md-6 medium-image mt-4 ">
                        <img src="https://world.g-shock.com/assets/img/women/gm-s5600pg/sns_index.png" alt="" />
                        <h3>For Women</h3>
                    </Link>
                    <div data-aos='fade-up' data-aos-offset={0} className="col-12 large-image mt-4">
                        <img src="https://cdn.shopify.com/s/files/1/1902/9663/files/Casio_G-Shock_Collection_Banner_New_Version_1370x397_c7405c17-237d-49a4-b8eb-e3ae9399c3ad_2048x2048.png?v=1611714420" alt="" />
                    </div>
                </div>
                <div className="row p-4">
                    <p data-aos='fade-up' data-aos-offset={0} style={{ fontSize: '1.5rem', textAlign: 'center' }}>The most durable digital and analog-digital watches in the industry, trusted by military personnel, law enforcement, surfers and outdoor enthusiasts around the world.</p>
                </div>
                <ProductList list={productNewList} title="New watches" />
                <ProductList list={productHotList} title="Best selling" />
                <div data-aos='fade-up' className="row story-container">
                    <div>
                        <Divider orientation="center" >
                            <h2>OUR STORIES</h2>
                        </Divider>
                    </div>
                    <div className="col-md-4 story mt-5">
                        <img src="https://www.gshock-vietnam.vn/wp-content/uploads/2019/08/GBD-800-8-6.png" alt="" />
                        <div className="w-100 flex-mid flex-column">
                            <h5>Story title</h5>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit officia, ab, cum, in reprehenderit nostrum doloremque nihil ut aut unde modi alias amet numquam veniam maxime fuga a quasi eligendi.</p>
                        </div>
                    </div>
                    <div className="col-md-4 story mt-5">
                        <img src="https://www.casio-intl.com/cs/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=content-disposition&blobheadervalue1=inline%3Bfilename%3DBA-110%28720_405%29.jpg&blobkey=id&blobtable=MungoBlobs&blobwhere=1426310854265&ssbinary=true" alt="" />
                        <div className="w-100 flex-mid flex-column">
                            <h5>Story title</h5>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit officia, ab, cum, in reprehenderit nostrum doloremque nihil ut aut unde modi alias amet numquam veniam maxime fuga a quasi eligendi.</p>
                        </div>
                    </div>
                    <div className="col-md-4 story mt-5">
                        <img src="https://www.g-shock.eu/resource/images/story/philosophie-header_mobil.jpg" alt="" />
                        <div className="w-100 flex-mid flex-column">
                            <h5>Story title</h5>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit officia, ab, cum, in reprehenderit nostrum doloremque nihil ut aut unde modi alias amet numquam veniam maxime fuga a quasi eligendi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage