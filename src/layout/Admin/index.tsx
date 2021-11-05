import { Dropdown, Input, Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/logo-black.png'
import { HomeOutlined, ContainerOutlined, AppstoreAddOutlined, TeamOutlined, IdcardOutlined, PlusOutlined } from '@ant-design/icons';
import '../../styles/admin.css'
import AddProductForm from "./Components/AddProductForm";
import AddCategory from "./Components/AddCategory";
import AddColor from "./Components/AddColor";
import ProductList from "./Components/ProductList";
import EditProductForm from "./Components/EditProductForm";
import OrderList from "./Components/OrderList";

const { SubMenu } = Menu
interface AdminProps {
    url?: string
}
const { Search } = Input;

export const AdminPage = ({ url }: AdminProps) => {
    const body = (
        <>
            {url === 'add-product' && <AddProductForm />}
            {url === 'add-category' && <AddCategory />}
            {url === 'add-color' && <AddColor />}
            {url === 'products' && <ProductList />}
            {url === 'edit-product' && <EditProductForm />}
            {!url && <OrderList/>}
        </>
    )
    const location = useLocation()
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex">
                    <Menu
                        className='mh-100'
                        style={{ width: 276 }}
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
                        <SubMenu key="sub1" title="Product management">
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
                        <SubMenu key="sub2" title="Account management">
                            <Menu.Item icon={<TeamOutlined />} key="/admin/users">
                                <Link to="/admin/user">All users</Link>
                            </Menu.Item>
                            <Menu.Item icon={<IdcardOutlined />} key="/admin/profile">
                                <Link to="/admin/profile">Profile</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="w-100">
                        <div className="container-fluid shadow p-15">
                            <div className="row">
                                <div className="d-flex justify-content-between" style={{padding: '0 40px'}}>
                                    <Search placeholder="Input here" style={{maxWidth: '400px'}} size="large" />
                                    <Dropdown overlay={<span></span>}>
                                        <button className="user-option-icon">Hello admin<i className="fal fa-users-cog right-icon"></i></button>
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
