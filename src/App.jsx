import { useRoutes } from 'react-router-dom'
import { isNotLoggedIn, isNotAdmin } from './utils/utils'
import Routes from './Routes' //? All Routes In This File
import Navbar from './Common/Components/Navbar'

// Helper function to check if path is public (no admin check required)
const isPublicPath = (path) => {
	const publicPaths = ['/signup', '/login', '/school']
	return publicPaths.includes(path)
}

function App() {
	const routes = useRoutes(Routes)
	const path = window.location.pathname

	// Redirect user if not logged in
	isNotLoggedIn()

	// If the current path is not public, check if the user is admin
	if (!isPublicPath(path)) {
		isNotAdmin()
	}

	// Determine if Navbar should be shown based on path
	const shouldShowNavbar = !isPublicPath(path)

	return (
		<>
			{shouldShowNavbar && <Navbar />}
			{routes}
		</>
	)
}

export default App
