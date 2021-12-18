import React, { useEffect, useState } from 'react'
import Banner from './Components/Banner'
import ProductList from '../../component/Common/ProductList'
import axios from "axios";
import { API_URL } from "../../API/API";
import { useDispatch, useSelector } from "react-redux";
import { setProductHotList, setProductNewList } from "../../redux/action/product";
import { State } from "../../redux";
import men from '../../assets/banner/left.png'
import women from '../../assets/banner/right.png'
import 'aos/dist/aos.css'
import Aos from 'aos'
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { Statistic} from 'antd';
import Voucher from './Components/Voucher';
import { Vouncher } from '../../Util/spec';
const { Countdown } = Statistic;
const HomePage = () => {
    const dispatch = useDispatch()
    const productNewList: [] = useSelector((state: State) => state.product.productNewList)
    const productHotList: [] = useSelector((state: State) => state.product.productHotList)
    const [voucher, setVoucher] = useState<[Vouncher]>([{
        name: '',
        discount: 0,
        description: '',
        startDate: new Date,
        endDate: new Date,
        applyFor: 0,
        code: ''
    }])
    const getProductList = () => {
        try {
            axios.get(`${API_URL}/product/status/New?page=1`)
                .then(res => {
                    if (res.data.success === true) {
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
                    if (res.data.success === true) {
                        dispatch(setProductHotList(res.data.data))
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getVoucher = () =>{
        axios.get(`${API_URL}/voucher`)
            .then(res=>{
                if(res.data.success === true){
                    setVoucher(res.data.data)
                }
            })
    }
    useEffect(() => {
        !productNewList.length && getProductList()
        !productHotList.length && getProductHotList()
        getVoucher()
        window.scrollTo(0, 0)
        Aos.init({ duration: 800 })
    }, [])
    return (
        <div className="container-fluid component-top bg-white">
            <div className="row">
                <Banner />
            </div>
            <div className="container" style={{ marginTop: '5px' }}>
                <div className="row">
                    <Link to='/product?page=1' data-aos='fade-up' data-aos-offset={60} className="col-md-6 medium-image mt-4 ">
                        <img src={men} alt="" />
                        <h3>For Men</h3>
                    </Link>
                    <Link to='/product?page=1' data-aos='fade-up' data-aos-offset={60} className="col-md-6 medium-image mt-4 ">
                        <img src={women} alt="" />
                        <h3>For Women</h3>
                    </Link>
                    {/* <div data-aos='fade-up' data-aos-offset={0} className="col-12 large-image mt-4">
                        <img src="https://cdn.shopify.com/s/files/1/1902/9663/files/Casio_G-Shock_Collection_Banner_New_Version_1370x397_c7405c17-237d-49a4-b8eb-e3ae9399c3ad_2048x2048.png?v=1611714420" alt="" />
                    </div> */}
                </div>
                <div className="p-4">
                    <p data-aos='fade-up' data-aos-offset={0} style={{ fontSize: '18px', textAlign: 'center' }}>The most durable digital and analog-digital watches in the industry, trusted by military personnel, law enforcement, surfers and outdoor enthusiasts around the world.</p>
                </div>
            </div>
            <div className="container-fluid">
                <Voucher vouncher={voucher}/>
            </div>
            <div className="container" style={{ marginTop: '30px' }}>
                <ProductList list={productNewList} title="New watches" max={5} />
                <ProductList list={productHotList} title="Best selling" max={5} />
                <div data-aos='fade-up' className="row story-container">
                    <Divider orientation="center" >
                        <h2>OUR STORIES</h2>
                    </Divider>
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
                <div className="row mb-3">
                    <div className="col-lg-3 col-6">
                        <div className="service-box  pt-3 pb-3 mt-4 flex-mid ">
                            <i className="fal fa-truck-loading"></i>
                            <h5 >FREE STANDARD DELIVERY</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="service-box pt-3 pb-3 mt-4 flex-mid" >
                            <i className="fal fa-shipping-fast"></i>
                            <h5 >FAST DELIVERY</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="service-box pt-3 pb-3 mt-4 flex-mid">
                            <i className="fal fa-hand-holding-box"></i>
                            <h5>FREE AND EASY RETURNS</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="service-box pt-3 pb-3 mt-4 flex-mid">
                            <i className="fal fa-credit-card"></i>
                            <h5>Online payment</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage