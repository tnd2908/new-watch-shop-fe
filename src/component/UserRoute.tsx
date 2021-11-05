import React, { useEffect, useState } from 'react';
import { Redirect, Route } from "react-router-dom";
const UserRoute = ({ ...rest }) => {
    // const auth: boolean = useSelector((state: State) => state.user.auth)
    const [auth, setAuth] = useState(false)
    useEffect(()=>{
        setAuth(true)
    },[])
    if(auth)
    return (
        <Route {...rest}/>
    );
    else return <Redirect to="/login"/>
};

export default UserRoute;