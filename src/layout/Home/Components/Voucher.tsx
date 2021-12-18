import React from 'react';
import { Vouncher } from '../../../Util/spec';
import moment from 'moment'
import { Typography } from 'antd';
const { Paragraph } = Typography
type Props = {
    vouncher: [Vouncher]
}
const Voucher = ({ vouncher }: Props) => {
    return (
        <div className="row">
            {vouncher.map((item: Vouncher) => (
                <div className="col-lg-6">
                    <div className="d-flex vouncher-box shadow-sm">
                        <div className="vouncher-box-left">
                            <p><i className="fal fa-gift left-icon"></i>Discount</p>
                            <h6> -{item.discount}% </h6>
                        </div>
                        <div className="vouncher-box-right">
                            <h6> {item.name} </h6>
                            <Paragraph ellipsis={{ rows: 2 }} style={{ color: 'gray' }}> {item.description} </Paragraph>
                            <p>From {moment(item.startDate).format('DD/MM/YYYY')} to {moment(item.endDate).format('DD/MM/YYYY')}</p>
                            <h5> {item.code} </h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Voucher;