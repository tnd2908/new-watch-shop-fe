import React, { Suspense, lazy } from 'react';
import './App.scss';
import 'antd/dist/antd.less'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { AdminPage } from './layout/Admin';
import ProtectedRoute from './component/ProtectedRoute';
import Navbar from './component/Common/Navbar';
import AuthPage from './layout/Auth/login';
import Footer from './component/Common/Footer';
import DetailPage from './layout/Detail/detail';
import Cart from './layout/Cart/cart';
import Loading from './component/Loading/Loading';
import UserRoute from './component/UserRoute';
import User from './layout/User';
import News from './layout/News';
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
			<Suspense fallback={<Loading/>}>
				<Navbar />
					<Switch>
						<ProtectedRoute exact path="/admin/" render={() => <AdminPage />} />
						<ProtectedRoute exact path="/admin/add-product" render={() => <AdminPage url="add-product" />} />
						<ProtectedRoute exact path="/admin/product/edit-product/:name" render={() => <AdminPage url="edit-product" />} />
						<ProtectedRoute exact path="/admin/products" render={() => <AdminPage url="products" />} />
						<ProtectedRoute exact path="/admin/add-category" render={() => <AdminPage url="add-category" />} />
						<ProtectedRoute exact path="/admin/add-color" render={() => <AdminPage url="add-color" />} />
						<ProtectedRoute exact path="/admin/vouncher" render={() => <AdminPage url="vouncher" />} />
						<ProtectedRoute exact path="/admin/order" render={() => <AdminPage url="order" />} />
						<ProtectedRoute exact path="/admin/new/action" render={() => <AdminPage url="new" />} />
						<Route exact path="/login" render={() => <AuthPage form="login" />} />
						<Route exact path="/register" render={() => <AuthPage form="register" />} />
						<Route exact path="/" component={HomePage} />
						<Route exact path="/product/:productName" component={DetailPage} />
						<Route exact path="/product" component={ProductPage} />
						<Route exact path="/product/men/:category" component={ProductPage} />
						<Route exact path="/cart" component={Cart} />
						<Route exact path="/news/:id" component={News}/>
						<UserRoute exact path="/user" render={()=> <User url="user"/>}/>
						<UserRoute exact path="/user/history" render={()=> <User url="history"/>}/>
						<UserRoute exact path="/user/gift" render={()=> <User url="gift"/>}/>
					</Switch>
				<Footer />
			</Suspense>
		</Router>
	);
}

export default App;
