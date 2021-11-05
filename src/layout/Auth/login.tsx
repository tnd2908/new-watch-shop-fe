import * as React from "react";
import LoginForm from "../../component/Common/LoginForm";
import RegisterForm from "../../component/Common/RegisterForm";
interface FormProps {
    form: string
}

const AuthPage = ({form}: FormProps) => {
    React.useEffect(()=>{
        window.scrollTo(0,0)
    },[form])
    return (
        <div className="container user-form bg-white">
            <div className="row">
                <div className="col-lg-6 user-form-left">
                    {form === 'login'?<div className="background"></div>:<RegisterForm/>}
                </div>
                <div className="col-lg-6 user-form-right">
                    {form === 'login'?<LoginForm/>:<div className="background-right"></div>}
                </div>
            </div>
        </div>
    );
}
export default AuthPage