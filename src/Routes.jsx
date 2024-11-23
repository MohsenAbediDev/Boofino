import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Logout from './Pages/Logout'
import Dashboard from './Pages/Dashboard'
import Cart from './Pages/Cart'
import MyOrders from './Pages/MyOrders'
import EditUser from './Pages/EditUser'
import InfoUser from './Pages/InfoUser'
import SelectionSchool from './Pages/SelectionSchool'
import AddProduct from './Pages/AddProduct'
import ProductsList from './Pages/ProductsList'
import EditProduct from './Pages/EditProduct'
import UserOrder from './Pages/UserOrder'
import AdminOrders from './Pages/AdminOrders'
import Statistic from './Pages/Statistic'
import SuccessPay from './Pages/SuccessPay'
import PayFailed from './Pages/PayFailed'
import Wallet from './Pages/Wallet'

const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/*', element: <NotFound /> },
	{ path: '/signup', element: <Signup /> },
	{ path: '/login', element: <Signin /> },
	{ path: '/logout', element: <Logout /> },
	{ path: '/school', element: <SelectionSchool /> },
	{ path: '/successful-payment', element: <SuccessPay /> },
	{ path: '/payment-failed', element: <PayFailed /> },

	{
		path: '/dashboard/*',
		element: <Dashboard />,
		children: [
			{ path: '', element: <InfoUser /> },
			{ path: 'editprofile', element: <EditUser /> },
			{ path: 'cart', element: <Cart /> },
			{ path: 'my-orders', element: <MyOrders /> },
			{ path: 'my-orders/:trackingCode', element: <UserOrder /> },
			{ path: 'admin-orders', element: <AdminOrders /> },
			{ path: 'add-product', element: <AddProduct /> },
			{ path: 'product-list', element: <ProductsList /> },
			{ path: 'statistic', element: <Statistic /> },
			{ path: 'wallet', element: <Wallet /> },
		],
	},
	{ path: '/edit-product/:name', element: <EditProduct /> },
]

export default routes
