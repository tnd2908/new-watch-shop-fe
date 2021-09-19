import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {Switch, BrowserRouter as Router, Route, useLocation} from 'react-router-dom'
import {AdminPage} from './layout/Admin';
import ProtectedRoute from './component/ProtectedRoute';
import Navbar from './component/Common/Navbar';
import AuthPage from './layout/Auth/login';

const  App = () => {
  return (
    <Router>
        <Navbar/>
        <Switch>
            <ProtectedRoute exact path="/admin/" render={()=> <AdminPage url=""/>}/>
            <ProtectedRoute exact path="/admin/add-product" render={()=> <AdminPage url="add-product"/>}/>
            <Route exact path="/login" render={()=> <AuthPage form="login"/>}/>
            <Route exact path="/register" render={()=> <AuthPage form="register"/>}/>
        </Switch>
    </Router>
  );
}

export default App;
