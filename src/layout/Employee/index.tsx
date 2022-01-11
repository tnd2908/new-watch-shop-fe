import { Dropdown, Input, Menu } from "antd";
import React,{useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/logo-black.png'
import { HomeOutlined, ContainerOutlined, AppstoreAddOutlined, TeamOutlined, IdcardOutlined, PlusOutlined, TagsOutlined, SnippetsOutlined } from '@ant-design/icons';
import '../../styles/admin.scss'
import AddProductForm from "./Components/AddProductForm";
import AddCategory from "./Components/AddCategory";
import AddColor from "./Components/AddColor";
import ProductList from "./Components/ProductList";
import EditProductForm from "./Components/EditProductForm";
import OrderList from "./Components/OrderList";
import AllOrder from "./Components/AllOrder";
import axios from "axios";
import { API_URL } from "../../API/API";

const { SubMenu } = Menu
interface EmployeeProps {
    url?: string
}
const { Search } = Input;

export const EmployeePage = ({ url }: EmployeeProps) => {
    const body = (
        <>
            {url === 'add-product' && <AddProductForm />}
            {url === 'add-category' && <AddCategory />}
            {url === 'add-color' && <AddColor />}
            {url === 'products' && <ProductList />}
            {url === 'edit-product' && <EditProductForm />}
            {url === 'order' && <AllOrder/>}
            {!url && <OrderList/>}
        </>
    )
    const location = useLocation()
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex">
                    <Menu
                        style={{ width: 256 }}
                        className='mh-100'
                        defaultSelectedKeys={[location.pathname]}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                        mode="inline"
                        theme="dark"
                    >
                        <div className="flex-mid p-4">
                            <img src={logo} style={{height: 'auto', width: '80%'}} alt=""/>
                        </div>
                        <Menu.Item icon={<HomeOutlined/>} key="/admin">
                            <Link to="/admin">Home</Link>
                        </Menu.Item>
                        <SubMenu key="sub1" title="Product">
                            <Menu.Item icon={<ContainerOutlined />} key="/admin/products">
                                <Link to="/admin/products">All product</Link>
                            </Menu.Item>
                            <Menu.Item icon={<AppstoreAddOutlined />} key="/admin/add-product">
                                <Link to="/admin/add-product">Add new product</Link>
                            </Menu.Item>
                            <Menu.Item icon={<PlusOutlined />} key="/admin/add-category">
                                <Link to="/admin/add-category">Add new category</Link>
                            </Menu.Item>
                            <Menu.Item icon={<PlusOutlined />} key="/admin/add-color">
                                <Link to="/admin/add-color">Add new color</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item icon={<SnippetsOutlined/>} key="/order">
                            <Link to="/admin/order">Order</Link>
                        </Menu.Item>
                        <SubMenu key="sub2" title="Account">
                            <Menu.Item icon={<TeamOutlined />} key="/admin/users">
                                <Link to="/admin/user">All users</Link>
                            </Menu.Item>
                            <Menu.Item icon={<IdcardOutlined />} key="/admin/profile">
                                <Link to="/admin/profile">Profile</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="w-100">
                        <div className="container-fluid shadow bg-white p-15">
                            <div className="row">
                                <div className="d-flex justify-content-between" style={{padding: '0 40px'}}>
                                    <Search placeholder="Input here" style={{maxWidth: '400px'}} size="large" />
                                    <Dropdown overlay={<span></span>}>
                                        <button className="user-option-icon">Hello Employee-San<i className="fal fa-users-cog right-icon"></i></button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="containter-fluid pw-4 pt-2 bgcolor pb-5">
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}