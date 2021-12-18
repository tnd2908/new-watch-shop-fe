import { Link, useLocation } from "react-router-dom"
import React from 'react'
type Props = {
    url: string,
    icon: string,
    html: string,
    to?: string,
    color?: string,
}
const MenuLink = ({url, icon, html, to, color}: Props) =>{
    const location = useLocation()
    const getClassName = () =>{
        if(location.pathname.split('/')[2] === url)
        return 'active'
        else if(!location.pathname.split('/')[2] && !url)
        return 'active'
        else return 'user-link'
    }
    return(
        <Link className={getClassName()} to={to ? `/user/${to}` : '/user'}><i style={{backgroundColor: color}} className={`fal fa-${icon} left-icon`}></i>{html}</Link>
    );
}
export default MenuLink
