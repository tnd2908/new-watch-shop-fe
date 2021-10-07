import MenuLeft from '../../component/Product/MenuLeft'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { API_URL } from "../../API/API";
import ProductVerticalList from '../../component/Product/ProductVerticalList';
import { Pagination, Breadcrumb, Skeleton, Drawer, Button } from 'antd';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
type Params = {
    category: string;
};
const ProductPage = () => {
    const [list, setList] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const { search } = useLocation()
    const location = useLocation()
    const param = new URLSearchParams(search)
    const [page, setPage] = useState(parseInt(param.get("page") || "1"))
    const [totalPage, setTotalPage] = useState(1)
    const history = useHistory()
    const [visible, setVisible] = useState(false)
    const { category } = useParams<Params>()
    const getProductList = () => {
        setLoading(true)
        try {
            if (location.pathname.includes('men' || 'women')) {
                axios.get(!param.get("color") ? `${API_URL}/product/category/${category}?page=${page}` :
                    `${API_URL}/product/category/${category}?color=${param.get('color')!.replaceAll('#', '%23')}&&page=${page}`
                )
                    .then(res => {
                        if (res.data.success == true) {
                            setList(res.data.data)
                            setTotalPage(res.data.totalPage)
                            setLoading(false)
                        }
                        else return
                    })
            }
            else axios.get(!param.get("color") ? `${API_URL}/product/query?page=${page}` :
                `${API_URL}/product/query?page=${page}&&color=${param.get('color')!.replaceAll('#', '%23')}`)
                .then(res => {
                    if (res.data.success == true) {
                        setList(res.data.data)
                        setTotalPage(res.data.totalPage)
                        setLoading(false)
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProductList()
    }, [location.pathname, location.search])
    return (
        <div className="container component">
            <div className="row">
                <div className="menu-container">
                    <MenuLeft/>
                </div>
                <div className="product-container" style={{ padding: '0' }}>
                    <div className="w-100 pb-2 d-flex align-items-center justify-content-between" style={{paddingLeft:'30px', paddingRight: '30px'}}>
                        <Breadcrumb>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/product?page=1">Product</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="reponsive-menu">
                            <Button onClick={()=>setVisible(true)} type='primary' size='large'>Filter</Button>
                            <Drawer visible={visible} onClose={()=>setVisible(false)} width={300}>
                                <MenuLeft />
                            </Drawer>
                        </div>
                        {list.length == 0 && !loading && <h5 className="mt-2"> Found: 0  </h5>}
                    </div>
                    {loading ? <Skeleton active /> : <ProductVerticalList list={list} />}
                    {list.length != 0 && !loading &&
                        <div className="w-100 flex-mid p-4">
                            <Pagination
                                defaultCurrent={page}
                                onChange={(e) => {
                                    history.push(`${location.pathname}?page=${e}`)
                                    setPage(e)
                                }}
                                total={totalPage * 10} />
                        </div>}
                </div>
            </div>
        </div>
    );
}
export default ProductPage