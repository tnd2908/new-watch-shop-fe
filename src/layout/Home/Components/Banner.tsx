import React from 'react'
import { Carousel } from 'antd';
const Banner = () => {
    return (
        <Carousel effect="fade" autoplay={false} autoplaySpeed={6000} dots={{ className: 'banner-dots' }} dotPosition="bottom">
            <div className="banner banner-2 "></div>
            <div className="banner banner-1"></div>
            <div className="banner banner-3"> </div>
        </Carousel>
    )
}
export default Banner