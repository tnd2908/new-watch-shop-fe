import React, { useEffect, useState } from 'react';
import { Collapse, Divider, Radio } from 'antd';
import { State } from '../../redux'
import { useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../API/API';
const { Panel } = Collapse;

const MenuLeft = () => {
    const [colorList, setColorList] = useState([])
    const history = useHistory()
    useEffect(() => {
        try {
            axios.get(`${API_URL}/product/color`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.success == true)
                        setColorList(res.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    const categoriesForMen: [] = useSelector((state: State) => state.category.categoriesForMen)
    const categoriesForWomen: [] = useSelector((state: State) => state.category.categoriesForWomen)
    const location = useLocation()
    const activeTab = location.pathname.split('/')[2]
    const activeItem = location.pathname.split('/')[3]
    return (
        <div className="product-menu">
            <h4>Filter by</h4>
            <Collapse defaultActiveKey={['color', 'men', activeTab]} ghost expandIconPosition="right" >
                <Panel header={<h6 className="product-menu-title">For men</h6>} key="men">
                    {categoriesForMen.map((item: any) => (
                        <Link to={`/product/men/${item._id}?page=1`}
                            className={item._id === activeItem
                                ? `product-menu-item active` : `product-menu-item`}>
                            {item.name}
                        </Link>
                    ))}
                </Panel>
                <div className="line mt-2 mb-2"></div>
                <Panel header={<h6 className="product-menu-title">For Women</h6>} key="2">
                    {categoriesForWomen.map((item: any) => (
                        <Link key={item._id} to="/" className="product-menu-item"> {item.name} </Link>
                    ))}
                </Panel>
                <div className="line mt-2 mb-2"></div>
                <Panel header={<h6 className="product-menu-title">Color</h6>} key="color">
                    <Radio.Group style={{ padding: '0' }}
                        onChange={(e)=>{
                        history.push(`${location.pathname}?color=${e.target.value.replaceAll('#', '%23')}&&page=1`)
                        }}>
                        <div className="container-fluid" style={{ padding: '0px' }}>
                            <div className="row">
                                {colorList.length ? colorList.map((item: any) => (
                                    <div className="menu-color" style={{ padding: '5px 10px' }}>
                                        {item.includes(',') ? <Radio.Button
                                            style={{ backgroundImage: `linear-gradient(100deg, ${item} 65%)`, marginRight: '10px' }}
                                            key={item}
                                            value={item}>
                                        </Radio.Button>
                                            : <Radio.Button style={{ backgroundColor: `${item}`, marginRight: '10px' }}
                                                value={item}>
                                            </Radio.Button>
                                        }
                                    </div>
                                )) : <Radio.Button value=""></Radio.Button>
                                }
                            </div>
                        </div>
                    </Radio.Group>
                </Panel>
                <div className="line mt-2 mb-2"></div>
            </Collapse>
        </div>
    );
}
export default MenuLeft