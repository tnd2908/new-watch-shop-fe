import { Redirect, Route } from "react-router-dom";

import * as React from "react";

// interface PrivateRouteProps extends RouteProps {}
export const ProtectedRoute = ({...rest}) =>{
    const token = localStorage.getItem('admin-token')
    if(token)
    return(
        <Route {...rest}/>
    );
    else return <Redirect to = "/login"/>
}
export default ProtectedRoute