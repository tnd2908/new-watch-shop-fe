import Item from 'antd/lib/list/Item';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { State } from '../../../redux';
import MenuLink from './MenuLink';

const MenuLeft = () => {
    const user = useSelector((state: State)=> state.user.userInfor)
    return (
        <div className="user-menu shadow-sm">
            <div className="user-image-container">
                <div className="user-avatar"></div>
            </div>
            <h5 className="user-name"> {user.lastName}  {user.firstName}</h5>
            <div className="p-2 w-100">
                <h6 className="text-danger text-center" >Point: 0</h6>
            </div>
            <MenuLink url="gift" icon="gift" html="Gift" to="gift" color="#d48806"></MenuLink>
            <MenuLink url="" icon="user" html="Profile" color="orange"></MenuLink>
            <MenuLink url="history" icon="history" html="History" to="history" color="#52c41a"></MenuLink>
            <MenuLink url="password" icon="lock-alt" html="Password" to="password" color="#bfbfbf"></MenuLink>
            <Link to="/"><i style={{backgroundColor:"grey"}} className="fal fa-sign-out left-icon"></i>Sign out</Link>
        </div>
    );
};

export default MenuLeft;