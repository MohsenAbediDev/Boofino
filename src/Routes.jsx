import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Logout from './Pages/Logout'
import Dashboard from './Pages/Dashboard'
import Cart from './Pages/Cart'
import EditUser from './Pages/EditUser'
import InfoUser from './Pages/InfoUser'
import SelectionSchool from './Pages/SelectionSchool'
import AddProduct from './Pages/AddProduct'
import ProductsList from './Pages/ProductsList'
import EditProduct from './Pages/EditProduct'
import Statistic from './Pages/Statistic'
import SuccessPay from './Pages/SuccessPay'

const routes = [
	{ path: '/', element: <Home/> },
	{ path: '/*', element: <NotFound/> },
	{ path: '/signup', element: <Signup/> },
	{ path: '/login', element: <Signin/> },
	{ path: '/logout', element: <Logout/> },
	{ path: '/school', element: <SelectionSchool/> },
	{ path: '/successfull-payment', element: <SuccessPay/> },
	
	{
		path: '/dashboard/*',
		element: <Dashboard />,
		children: [
			{ path: '', element: <InfoUser /> },
			{ path: 'editprofile', element: <EditUser/> },
			{ path: 'cart', element: <Cart /> },
			{ path: 'add-product', element: <AddProduct/> },
			{ path: 'product-list', element: <ProductsList/>},
			{ path: 'statistic', element: <Statistic/>},
		],
	},
	{path:'/edit-product/:name' , element: <EditProduct/>}
]

export default routes
