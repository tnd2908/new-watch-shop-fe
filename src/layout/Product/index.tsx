import MenuLeft from './Components/MenuLeft'
import React, { useEffect, useState } from 'react'
import ProductVerticalList from './Components/ProductVerticalList';
import { Pagination, Breadcrumb, Radio, Drawer, Button } from 'antd';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import RiseLoader from "react-spinners/RiseLoader";
import querystring from 'query-string'
import productAPI from '../../API/productAPI';
import ProductHorizontalList from './Components/ProductHorizontalList';
type Params = {
    category: string;
};

const ProductPage = () => {
    const [list, setList] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const { search } = useLocation()
    const location = useLocation()
    const param = new URLSearchParams(search)
    const [totalPage, setTotalPage] = useState(1)
    const history = useHistory()
    const [visible, setVisible] = useState(false)
    const { category } = useParams<Params>()
    const [type, setType] = useState('vertical')
    const getProductList = () => {
        setLoading(true)
        const color = param.get("color") && param.get("color")!.replaceAll('#', '%23')
        const page = param.get("page") ? param.get("page") : 1
        const data = querystring.parse(`category=${category}&color=${color}&page=${page}`)
        productAPI.queryProduct(data).then(res => {
            setList(res?.data)
            setTotalPage(res?.totalPage)
            setLoading(false)
        })
    }
    useEffect(() => {
        getProductList()
        window.scrollTo(0, 200)
    }, [location.pathname, location.search])
    return (
        <>
            <div className="container-fluid product-banner" >
                <img src="https://gshock.casio.com/content/casio/locales/sg/en/brands/gshock/g-news/editorials/2021/geek-culture-gsw-h1000/_jcr_content/root/responsivegrid/container_1689197747/teaser.casiocoreimg.jpeg/1625594780951/gsw-h1000-banner-1920x816px.jpeg" alt="" />
                <div className="flex-mid h-100 product-banner-title">
                    <h2 className="text-white ">
                        {location.pathname.includes('men') && 'FOR MEN'}
                        {location.pathname.includes('women') && 'FOR WOMEN'}
                        {location.pathname.includes('men' || 'women') == false && 'ALL PRODUCT'}
                    </h2>
                </div>
            </div>
            <div className="container all-product">
                <div className="row">
                    <div className="menu-container">
                        <MenuLeft />
                    </div>
                    <div className="product-container">
                        <div className="w-100 pb-2 d-flex align-items-center justify-content-between" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                            <Breadcrumb>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to="/product?page=1">Product</Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="reponsive-menu">
                                <Button onClick={() => setVisible(true)} type='primary' size='large'>Filter</Button>
                                <Drawer visible={visible} onClose={() => setVisible(false)} width={300}>
                                    <MenuLeft />
                                </Drawer>
                            </div>
                            {list.length == 0 && !loading && <h5 className="mt-2"> Found: 0  </h5>}
                        </div>
                        <div className="display-list">
                            <h6 style={{ marginRight: '20px' }}>Display: </h6>
                            <Radio.Group buttonStyle="solid" defaultValue={"vertical"}
                                onChange={e => setType(e.target.value)}
                            >
                                <Radio.Button style={{ marginRight: '10px', padding: '7px' }} key="vertical" value="vertical">
                                    <i className="fal fa-th"></i>
                                </Radio.Button>
                                <Radio.Button style={{ padding: '7px' }} key="horizontal" value="horizontal">
                                    <i className="fal fa-th-list"></i>
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        {loading ? <div className="flex-mid h-50vh">
                            <RiseLoader size={15} color={'gray'} margin={2} />
                        </div> : type == "vertical" ? <ProductVerticalList list={list} /> : <ProductHorizontalList list={list} />}
                        {!loading &&
                        <div className="w-100 flex-mid p-4">
                            <Pagination
                                defaultCurrent={parseInt(param.get("page")!)}
                                hideOnSinglePage
                                onChange={(e) => {
                                    history.push(`${location.pathname}?page=${e}`)
                                }}
                                total={totalPage * 10} />
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductPage