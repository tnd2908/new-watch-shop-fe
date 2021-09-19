import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddProductForm from "../../component/Admin/AddProductForm";
import logo from '../../assets/logo.png'
import '../../styles/admin.css'
const { SubMenu } = Menu
interface AdminProps {
    url: string
}

export const AdminPage = ({ url }: AdminProps) => {
    const body = (
        <>
            {url === 'add-product' && <AddProductForm />}
        </>
    )
    const location = useLocation()
    const [key, setKey] = useState(location.pathname)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex">
                    <Menu
                        className='mh-100'
                        style={{ width: 256 }}
                        defaultSelectedKeys={[key]}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <Menu.Item key="/admin">
                            <Link to="/admin">Home</Link>
                        </Menu.Item>
                        <SubMenu key="sub1" title="Navigation One">
                            <Menu.Item key="/admin/add-product">
                                <Link to="/admin/add-product">Add new product</Link>
                            </Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="Navigation Two">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="w-100">
                        <div className="container-fluid shadow p-3">
                            <div className="row">
                                <div className="d-flex justify-content-between" style={{padding: '0 40px'}}>
                                    <img src={logo} className="logo"/>
                                    <Dropdown overlay={<span></span>}>
                                        <button className="user-option-icon">Hello admin<i className="fal fa-users-cog right-icon"></i></button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="containter-fluid p-4">
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
