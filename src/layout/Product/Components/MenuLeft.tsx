import React, { useEffect, useState } from 'react';
import { Button, Collapse, Radio, Slider } from 'antd';
import { State } from '../../../redux'
import { useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../API/API';
const { Panel } = Collapse;

const MenuLeft = () => {
    const [colorList, setColorList] = useState([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0,10000])
    const history = useHistory()
    useEffect(() => {
        try {
            axios.get(`${API_URL}/color`)
                .then(res => {
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
    const param = new URLSearchParams(location.search)
    const marks = {
        0: {
            style: {
                marginTop: '10px',
                fontSize: '17px'
            },
            label: <span>${new Intl.NumberFormat().format(priceRange[0])}</span>,
        },
        10000: {
            style: {
                marginTop: '10px',
                fontSize: '17px'
            },
            label: <span>${new Intl.NumberFormat().format(priceRange[1])}</span>,
        },
    };
    return (
        <div className="product-menu">
            <h4>Filter by</h4>
            <Collapse defaultActiveKey={['color', 'men', 'sort', activeTab]} ghost expandIconPosition="right" >
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
                        defaultValue={param.get("color") && param.get("color")}
                        onChange={(e) => {
                            history.push(`${location.pathname}?color=${e.target.value.replaceAll('#', '%23')}&&page=1`)
                        }}>
                        <div className="container-fluid" style={{ padding: '0px' }}>
                            <div className="row">
                                {colorList.length ? colorList.map((item: any) => (
                                    <div className="menu-color" style={{ padding: '5px 10px' }}>
                                        {<Radio.Button style={{ backgroundColor: `${item.name}`, marginRight: '10px' }}
                                            value={item.name}
                                            key={item.name}>
                                        </Radio.Button>}
                                    </div>
                                )) : <Radio.Button value=""></Radio.Button>
                                }
                            </div>
                        </div>
                    </Radio.Group>
                </Panel>
                <div className="line mt-2 mb-2"></div>
                <Panel header={<h6 className="product-menu-title">Price from</h6>} key="sort">
                    <Slider range
                        defaultValue={priceRange}
                        min={0}
                        max={10000}
                        step={100}
                        onChange={e=>setPriceRange(e)}
                        tooltipPlacement="bottom"
                        tooltipVisible={false}
                        tipFormatter={(value: any)=> <h6 className="text-white"> ${new Intl.NumberFormat().format(value)} </h6>}
                        marks={marks}
                    />
                    <Button className="mt-4 w-100">Sort</Button>
                </Panel>
            </Collapse>
        </div>
    );
}
export default MenuLeft