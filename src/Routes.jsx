import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Dashboard from './Pages/Dashboard'
import Cart from './Pages/Cart'
import EditUser from './Pages/EditUser'
import InfoUser from './Pages/InfoUser'

const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/*', element: <NotFound /> },
	// { path: '/dashboard', element: <Dashboard /> },
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
