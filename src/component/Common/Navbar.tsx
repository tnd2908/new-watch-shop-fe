import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../styles/home.scss'
import logo from '../../assets/logo-black.png'
import logoW from '../../assets/logo.png'
import axios from 'axios'
import { API_URL } from '../../API/API'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../redux'
import { setUserInfor, userLogin, userLogout } from '../../redux/action/user'
import { Drawer, Dropdown, Collapse, Input, Button, Affix } from 'antd'
import DropdownCategory from './Dropdown'
import { CaretRightOutlined } from '@ant-design/icons';
import ReponsiveDropdown from './ReponsiveDropdown'
import { SearchOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const Option = () => {
    const dispatch = useDispatch()
    const logout = () => {
        localStorage.removeItem('token')
        dispatch(userLogout())
    }
    return (
        <div className="bg-white user-option shadow">
            <h5>Option</h5>
            <Link to="/user"><p><i className="fal fa-id-card-alt left-icon"></i>User Profile </p></Link>
            <p onClick={() => logout()}><i className="fal fa-sign-out-alt left-icon"></i>Logout</p>
        </div>
    );
}
interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    gender: string,
    ava: string,
    userId?: string
}
const Navbar = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    const [ava, setAva] = useState('')
    const user: IUser = useSelector((state: State) => state.user.userInfor)
    const auth = useSelector((state: State) => state.user.auth)
    const getUserInfor = () => {
        if (localStorage.getItem('token'))
            try {
                axios.get(`${API_URL}/auth`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => {
                        if (res.data.success === true) {
                            const data = res.data.validInfor
                            dispatch(setUserInfor(res.data.validInfor))
                            dispatch(userLogin())
                            setAva(data.lastName.charAt(0) + data.firstName.charAt(0))
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        else return
    }
    useEffect(() => {
        if (user.userId){
            setAva(user.lastName.charAt(0) + user.firstName.charAt(0))
        }
        else
            getUserInfor()
    }, [auth, ava])
    if (location.pathname.startsWith('/admin'))
        return <></>
    else
        return (
            <>
                <div className="w-100 bg-dark" style={{ padding: '5px' }}>
                    <p className="text-white text-center">FREE SHIPPING ON ALL ORDERS OVER $500 </p>
                </div>
                <Affix offsetTop={0}>
                    <div className="container-fluid navbar-menu">
                        <div className="row">
                            <div className="navbar-top">
                                <div className="navbar-top-left">
                                    <button onClick={() => setVisible(true)} className="toggle-navbar"><i className="fal fa-bars"></i></button>
                                    <img src={logoW} alt="" className="logo" />
                                    <button className="toggle-user"><i className="fal fa-user"></i></button>
                                </div>
                                <div className="navbar-top-center">
                                    <Input.Search style={{ width: '100%' }} enterButton={<Button><SearchOutlined style={{ color: 'grey', margin: '0 auto' }} /></Button>} size="large" placeholder='Searching watches name' />
                                </div>
                                <div className="navbar-top-right">
                                    {user.userId ? <div className="d-flex align-items-center">
                                        <Link to="/"><i className="far fa-heart"></i></Link>
                                        <Link to="/"><i className="far fa-bell"></i></Link>
                                        <Link to={`/cart`}><i className="far fa-shopping-bag"></i></Link>
                                        <Link style={{ fontSize: '18px' }} to={`/profile/${user.userId}`}>Hi {`${user.lastName} ${user.firstName}`}</Link>
                                        <span className="avatar-icon"> {ava} </span>
                                        <Dropdown overlay={<Option />} placement="bottomLeft" trigger={['click']}>
                                            <button><i className="fas fa-caret-down"></i></button>
                                        </Dropdown>
                                    </div> :
                                        <Fragment>
                                            <Link to="/"><i className="far fa-heart"></i></Link>
                                            <Link to="/"><i className="far fa-bell"></i></Link>
                                            <Link to={`/cart`}><i className="far fa-shopping-bag"></i></Link>
                                            <Link to="/register">Register</Link>
                                            <span> | </span>
                                            <Link to="/login">Login</Link>
                                            {user.lastName}
                                        </Fragment>
                                    }
                                </div>
                            </div>
                            <Drawer
                                placement="left"
                                closable={false}
                                visible={visible}
                                width={'90vw'}
                                className="drawer-menu"
                                onClose={() => setVisible(false)}
                            >
                                <div className="d-flex justify-content-between drawer-menu-header">
                                    <img src={logo} alt="" className="logo" />
                                    <button onClick={() => setVisible(false)} className="toggle-navbar"><i className="fal fa-times"></i></button>
                                </div>
                                <div className="drawer-menu-search flex-mid">
                                    <Input.Search style={{ width: '90%' }} enterButton='Search' size="large" placeholder='Searching watches name' />
                                </div>
                                <div className="d-flex justify-content-around drawer-icon-container">
                                    <Link to="/"><i className="far fa-heart left-icon"></i>Favourite</Link>
                                    <Link to="/cart"><i className="far fa-shopping-bag left-icon"></i>Shopping bag</Link>
                                </div>
                                <div className="nav-item">
                                    <Link className="s17" to="/">Home</Link>
                                </div>
                                <div className="nav-item">
                                    <Link className="s17" to="/product">Watches</Link>
                                </div>
                                <Collapse
                                    bordered={false}
                                    className="site-collapse-custom-collapse"
                                    expandIcon={({ isActive }) => <CaretRightOutlined style={{ fontSize: '20px', color: 'white' }} rotate={isActive ? 90 : 0} />}
                                >
                                    <Panel header={<span className="text-white s17">For Men</span>} key="1" className="site-collapse-custom-panel bg-black">
                                        <ReponsiveDropdown gender="Men" />
                                    </Panel>
                                    <Panel header={<span className="text-white s17">For Women</span>} key="2" className="site-collapse-custom-panel bg-black">
                                        <ReponsiveDropdown gender="Women" />
                                    </Panel>
                                </Collapse>
                                <div className="nav-item">
                                    <Link className="s17" to="/">Limited Edition</Link>
                                </div>
                                <div className="nav-item">
                                    <Link className="s17" to="/">About Us</Link>
                                </div>
                            </Drawer>
                            <div className="navbar-bottom">
                                <Link to="/">Home</Link>
                                <Link to="/product?page=1">Watches</Link>
                                <Dropdown overlay={<DropdownCategory gender="Men" />} trigger={['hover']} >
                                    <Link to="/">Men <i className="fal fa-angle-down"></i></Link>
                                </Dropdown>
                                <Dropdown overlay={<DropdownCategory gender="Women" />} trigger={['hover']}>
                                    <Link to="/">Women <i className="fal fa-angle-down"></i></Link>
                                </Dropdown>
                                <Link to="/">Limited Edition</Link>
                                <Link to="/">Comming soon</Link>
                                <Link to="/">About us</Link>
                            </div>
                        </div>
                    </div>
                </Affix>
            </>
        );
}
export default Navbar