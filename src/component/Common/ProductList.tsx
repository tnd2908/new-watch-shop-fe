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
    hideTitle?: boolean,
    max?: number
}

const ProductList = ({ list, title, hideTitle, max }: ListProps) => {
    useEffect(() => {
        Aos.init({ duration: 600 })
    }, [])
    return (
        <div data-aos='fade-right' data-aos-offset={160} className="container-fluid pt-3 pb-2">
            <div className="title">
                {!hideTitle && <h2> {title} </h2>}
                <div className="button-container">
                    <button className={`prev-${title.split(' ').join('-')}`}><i className="fal fa-chevron-left"></i></button>
                    <button className={`next-${title.split(' ').join('-')}`}><i className="fal fa-chevron-right"></i></button>
                </div>
            </div>
            <Divider></Divider>
            {list.length ? <Swiper
                slidesPerView={2}
                spaceBetween={10}
                navigation={
                    {
                        nextEl: `.next-${title.split(' ').join('-')}`,
                        prevEl: `.prev-${title.split(' ').join('-')}`,
                        disabledClass: 'disable-btn'
                    }
                }
                style={{ padding: '5px' }}
                breakpoints={{
                    830: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    1200: {
                        slidesPerView: max === 5 ? 4 : 3,
                        spaceBetween: 10
                    },
                    1500: {
                        slidesPerView: max === 5 ? 5 : 4,
                        spaceBetween: 10
                    }
                }}>
                {list.map((item: any) => (
                    <SwiperSlide key={item._id} className="bg-light rounded">
                        <div className="product-card">
                            <Link to={`/product/${item.name}`}><img src={`${API_URL}/upload/${item.images[0]}`} alt="" /></Link>
                            <div className="card-tag">
                                <Tag color="#f50"> {item.status} </Tag>
                            </div>
                            <div className="product-card-body">
                                <Link to={`/product/${item.name}`}>
                                    <h6> {item.name} </h6>
                                </Link>
                                <div className="product-card-body-detail">
                                    <div className="product-card-body-color">
                                        <p className="text-muted">Color: </p>
                                        <p className="color-block" style={{ backgroundColor: ` ${item.color}` }}></p>
                                    </div>
                                    <div className="card-price">
                                        <h5>${item.price}.00 </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="product-card-footer">
                                <button><i className="fal fa-shopping-bag left-icon"></i>Add to bag</button>
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