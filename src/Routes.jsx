import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Dashboard from './Pages/Dashboard'
import Cart from './Pages/Cart'

const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/*', element: <NotFound /> },
	// { path: '/dashboard', element: <Dashboard /> },
	{
		path: '/dashboard/*',
		element: <Dashboard />,
		children: [{ path: 'cart', element: <Cart /> }],
	},
]

export default routes
