import { Redirect, Route } from "react-router-dom";

// interface PrivateRouteProps extends RouteProps {}
export const EmployeeRoute = ({...rest}) =>{
    const token = localStorage.getItem('employee')
    if(token)
    return(
        <Route {...rest}/>
    );
    else return <Redirect to = "/login"/>
}
export default EmployeeRoute