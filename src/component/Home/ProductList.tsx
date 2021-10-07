import React, { useEffect } from 'react'
import { API_URL } from "../../API/API";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { Divider, Skeleton, Tag } from "antd";
import Aos from 'aos'
import { Link } from "react-router-dom";
SwiperCore.use([Navigation])
type ListProps = {
    list: [],
    title: string,
}

const ProductList = ({ list, title }: ListProps) => {
    useEffect(() => {
        Aos.init({ duration: 600 })
    }, [])
    return (
        <div data-aos='fade-right' data-aos-offset={160} className="container-fluid pt-2 pb-2 bg-white">
            <Divider orientation="left">
                <div className="title">
                    <h2> {title} </h2>
                    <div className="button-container">
                        <button className={`prev-${title.split(' ').join('-')}`}><i className="fal fa-chevron-left"></i></button>
                        <button className={`next-${title.split(' ').join('-')}`}><i className="fal fa-chevron-right"></i></button>
                    </div>
                </div>
            </Divider>
            {list.length ? <Swiper
                slidesPerView={2}
                spaceBetween={10}
                
                navigation={
                    {
                        nextEl: `.next-${title.split(' ').join('-')}`,
                        prevEl: `.prev-${title.split(' ').join('-')}`
                    }
                }
                style={{ padding: '20px 5px' }}
                breakpoints={{
                    830: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10
                    },
                    1500: {
                        slidesPerView: 5,
                        spaceBetween: 10
                    }
                }}>
                {list.map((item: any) => (
                    <SwiperSlide key={item._id} className="shadow-card rounded">
                        <div className="product-card">
                            <Link to={`/product/${item._id}`}><img src={`${API_URL}/upload/${item.images[0]}`} alt="" /></Link>
                            <div className="card-tag">
                                <Tag color="#f50"> {item.status} </Tag>
                            </div>
                            <div className="product-card-body">
                                <Link to={`/product/${item._id}`}>
                                    <h6> {item.name} </h6>
                                </Link>
                                <div className="product-card-body-detail">
                                    <div className="product-card-body-color">
                                        <p className="text-muted">Color: </p>
                                        {item.color.includes(',') ? <p className="color-block" style={{ backgroundImage: `linear-gradient(150deg, ${item.color} 65%)` }}></p>
                                            : <p className="color-block" style={{ backgroundColor: ` ${item.color}` }}></p>}
                                    </div>
                                    <div className="card-price">
                                        <h5>${item.price}.00 </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="product-card-footer">
                                <button className="add-to-card"><i className="fal fa-shopping-bag left-icon"></i>Add to bag</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper> :
                <Skeleton active />
            }
        </div>
    );
}
export default ProductList