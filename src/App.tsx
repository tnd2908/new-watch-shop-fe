import React, { Suspense, lazy } from 'react';
import './App.css';
import 'antd/dist/antd.less'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { AdminPage } from './layout/Admin';
import ProtectedRoute from './component/ProtectedRoute';
import Navbar from './component/Common/Navbar';
import AuthPage from './layout/Auth/login';
import Footer from './component/Common/Footer';
import DetailPage from './layout/Detail/detail';
import Cart from './layout/Cart/cart';
import Payment from './layout/Payment/payment';
import Loading from './component/Loading/Loading';
const HomePage = lazy(() => {
	return Promise.all([
		import('./layout/Home/home'),
		new Promise(resolve => setTimeout(resolve, 2000))
	])
		.then(([moduleExports]) => moduleExports);
});
const ProductPage = lazy(() => import('./layout/Product'))

const App = () => {
	return (
		<Router>
			<Navbar />
			<Suspense fallback={<Loading/>}>
				<Switch>
					<ProtectedRoute exact path="/admin/" render={() => <AdminPage />} />
					<ProtectedRoute exact path="/admin/add-product" render={() => <AdminPage url="add-product" />} />
					<ProtectedRoute exact path="/admin/product/edit-product/:name" render={() => <AdminPage url="edit-product" />} />
					<ProtectedRoute exact path="/admin/products" render={() => <AdminPage url="products" />} />
					<ProtectedRoute exact path="/admin/add-category" render={() => <AdminPage url="add-category" />} />
					<ProtectedRoute exact path="/admin/add-color" render={() => <AdminPage url="add-color" />} />
					<Route exact path="/login" render={() => <AuthPage form="login" />} />
					<Route exact path="/register" render={() => <AuthPage form="register" />} />
					<Route exact path="/" component={HomePage} />
					<Route exact path="/product/:productName" component={DetailPage} />
					<Route exact path="/product" component={ProductPage} />
					<Route exact path="/product/men/:category" component={ProductPage} />
					<Route exact path="/cart" component={Cart} />
					<Route exact path="/payment" component={Payment} />
				</Switch>
				<Footer />
			</Suspense>
		</Router>
	);
}

export default App;
