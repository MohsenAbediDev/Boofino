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

const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/*', element: <NotFound /> },
	{ path: '/signup', element: <Signup /> },
	{ path: '/login', element: <Signin /> },
	{ path: '/logout', element: <Logout /> },
	{ path: '/school', element: <SelectionSchool /> },
	
	{
		path: '/dashboard/*',
		element: <Dashboard />,
		children: [
			{ path: '', element: <InfoUser /> },
			{ path: 'editprofile', element: <EditUser /> },
			{ path: 'cart', element: <Cart /> },
		],
	},
]

export default routes
