import React from 'react';
import { Redirect, Route } from "react-router-dom";
const UserRoute = ({ ...rest }) => {
    const userToken = localStorage.getItem("token")
    window.scrollTo(0,0)
    if(userToken)
    return (
        <Route {...rest}/>
    );
    else return <Redirect to="/login"/>
};

export default UserRoute;