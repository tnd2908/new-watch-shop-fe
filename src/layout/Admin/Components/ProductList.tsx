import React, { useEffect, useState } from 'react'
import {Table} from 'antd'
import axios from 'axios'
import { API_URL } from '../../../API/API'
import { Link } from 'react-router-dom'
const {Column} = Table
const ProductList = () =>{
    const [productList, setProductList] = useState([])
    useEffect(()=>{
        try {
            axios.get(`${API_URL}/product`)
                .then(res=>{
                    if(res.data.success === true){
                        setProductList(res.data.data)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },[])
    return(
        <div className="container-fluid pt-5">
            <Table dataSource={productList} bordered>
                <Column title="Name" dataIndex="name" key="name" ellipsis={true} />
                <Column title="Price" key="price" render={data => (
                    <span>${new Intl.NumberFormat().format(data.price)}</span>
                )}/>
                <Column title="Quantity" dataIndex="quantity" key="quantity" />
                <Column title="Saled" dataIndex="saled" key="saled" />
                <Column title="Category" key="category" render={category=>(
                    <span> {category.category.name} </span>
                )}/>
                <Column title="Action" key="action" width="160px"
                    render={action => (
                        <div className="d-flex">
                            <button className="admin-btn-detail-product">Detail</button>
                            <Link to={`/admin/product/edit-product/${action.name}`}><button className="admin-btn-edit">Edit</button></Link>
                        </div>
                    )} />
            </Table>
        </div>
    )
}
export default ProductList