import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../styles/home.css'
import logo from '../../assets/logo-black.png'
import axios from 'axios'
import { API_URL } from '../../API/API'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../redux'
import { setUserInfor, userLogout } from '../../redux/action/user'
import { Dropdown } from 'antd'
const Option = () =>{
    const dispatch = useDispatch()
    const logout = () =>{
        localStorage.removeItem('token')
        dispatch(userLogout())
        window.location.href = '/'
    }
    return(
        <div className="bg-white user-option shadow">
            <h5>Option</h5>
            <p><i className="fal fa-id-card-alt left-icon"></i>User Profile </p>
            <p onClick={()=>logout()}><i className="fal fa-sign-out-alt left-icon"></i>Logout</p>
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
    const user :IUser = useSelector((state: State) => state.user.userInfor)
    const auth = useSelector((state: State) => state.user.auth)
    const ava = user.lastName.charAt(0) + user.firstName.charAt(0)
    const getUserInfor = () => {
        if(localStorage.getItem('token'))
        try {
            axios.get(`${API_URL}/auth`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success == true) {
                        dispatch(setUserInfor(res.data.validInfor))
                    }
                })
        } catch (error) {
            console.log(error)
        }
        else return
    }
    useEffect(()=>{
        console.log(location.pathname)
    },[])
    useEffect(() => {
        console.log('1')
        console.log(user)
        if (user.userId)
            return
        else
            getUserInfor()
    },[auth])
    if(location.pathname.startsWith('/admin'))
    return <></>
    else
    return (
        <div className="container-fluid navbar-menu">
            <div className="row">
                <div className="navbar-top w-100">
                    <div className="navbar-top-left">
                        <img src={logo} alt="" className="logo" />
                    </div>
                    <div className="navbar-top-right">
                        {user.userId ? <div className="d-flex align-items-center">
                            <Link style={{fontSize:'18px'}} to={`/profile/${user.userId}`}>Hi {`${user.lastName} ${user.firstName}`}</Link> 
                            <span className="avatar-icon"> {ava} </span>
                            <Dropdown overlay={<Option/>} placement="bottomLeft" trigger={['click']}>
                                <button className="user-option-btn"><i className="fas fa-caret-down"></i></button>
                            </Dropdown>
                        </div>:
                            <Fragment>
                                <Link to="/register">Register</Link>
                                <span> | </span>
                                <Link to="/login">Login</Link>
                                {user.lastName}
                            </Fragment>
                        }
                    </div>
                </div>
                <div className="navbar-bottom w-100">
                    <div className="navbar-bottom-left">
                        <Link to="/">Home</Link>
                        <Link to="/">Watches</Link>
                        <Link to="/">Men</Link>
                        <Link to="/">Women</Link>
                        <Link to="/">Limited Edition</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className="navbar-bottom-right">
                        <Link to="/"><i className="far fa-heart"></i></Link>
                        <Link to="/"><i className="far fa-search"></i></Link>
                        <Link to="/"><i className="far fa-shopping-bag"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Navbar