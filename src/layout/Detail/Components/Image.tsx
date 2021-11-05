import React, { useEffect, useState } from 'react';
import { Detail } from '../../../Util/spec';
import { LoadingOutlined} from '@ant-design/icons'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper'
import SkeletonImage from 'antd/lib/skeleton/Image';
import { API_URL } from '../../../API/API';
SwiperCore.use([Navigation])
type ImageProps ={
    detail: Detail,
    isLoading: boolean,
}
const Image = ({detail, isLoading}:ImageProps) => {
    const [image, setImage] = useState<string>(detail.images[0])
    useEffect(()=>{
        setImage(`${API_URL}/upload/${detail.images[0]}`)
    },[detail.images[0]])
    return (
        <div className="col-lg-6 mt-1 mb-2">
                    <div className="image-container bg-e flex-mid">
                        {image && !isLoading ? <img className="detail-image-main" src={image} alt="" /> :
                            <div className="loading-image flex-mid">
                                <LoadingOutlined style={{ fontSize: '40px', color: 'black' }} />
                            </div>
                        }
                    </div>
                    <div className="container-fluid bg-white" style={{ padding: '0' }} >
                        <div className="row" >
                            {detail.images.length && detail.images[0] && !isLoading ? <Swiper
                                slidesPerView={3}
                                spaceBetween={10}
                                navigation={
                                    {
                                        nextEl: '.detail-prev',
                                        prevEl: '.detail-next'
                                    }
                                }
                                style={{ padding: '0 10px', position: 'relative' }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 3,
                                        spaceBetween: 10
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 10
                                    }
                                }}>
                                <div className="d-flex detail-image-button-container">
                                    <button className="detail-next"><i className="fal fa-chevron-left"></i></button>
                                    <button className="detail-prev"><i className="fal fa-chevron-right"></i></button>
                                </div>
                                {detail.images.map((item: any) => (
                                    <SwiperSlide key={item._id} className="shadow-card rounded">
                                        <div className="sub-image-container w-100 bg-e">
                                            <img onClick={() => setImage(`${API_URL}/upload/${item}`)} src={`${API_URL}/upload/${item}`} alt="" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper> :
                                <div className="col-4">
                                    <div className="sub-image-container bg-e">
                                        <div className="loading-sub-image flex-mid">
                                            <SkeletonImage />
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
    );
};

export default Image;