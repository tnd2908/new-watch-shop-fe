import React  from 'react'
import { Carousel } from 'antd';

const Banner = () => {
    return (
        <Carousel effect="fade" autoplay autoplaySpeed={6000} dots={{ className: 'banner-dots' }} dotPosition="bottom">
            <div className="banner banner-2 ">
                <div className="flex-mid w-100 h-100 flex-column">
                    <h3 className="text-white">
                        Explore new watches
                    </h3>
                    <p>The most durable digital and analog-digital watches in the industry, trusted by military personnel, law enforcement, surfers and outdoor enthusiasts around the world.</p>
                </div>
            </div>
            <div className="banner banner-1">
            <div className="flex-mid w-100 h-100 flex-column">
                    <h3 className="text-white">
                        Sale up to 50%
                    </h3>
                    <p>The most durable digital and analog-digital watches in the industry, trusted by military personnel, law enforcement, surfers and outdoor enthusiasts around the world.</p>
                </div>
            </div>
            <div className="banner banner-3">
            <div className="flex-mid w-100 h-100 flex-column">
                    <h3 className="text-white">
                        Explore new watches
                    </h3>
                    <p>The most durable digital and analog-digital watches in the industry, trusted by military personnel, law enforcement, surfers and outdoor enthusiasts around the world.</p>
                </div>
            </div>
        </Carousel>
    )
}
export default Banner