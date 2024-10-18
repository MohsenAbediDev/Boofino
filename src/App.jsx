import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { isNotLoggedIn, isNotAdmin } from './utils/utils'
import Routes from './Routes' //? All Routes In This File
import Navbar from './Common/Components/Navbar'
import Loader from './Common/Components/Loader/Loader'

function App() {
	const [loading, setLoading] = useState(true)
	const routes = useRoutes(Routes)
	const path = window.location.pathname

	// Helper function to check if path is public (no admin check required)
	const isPublicPath = (path) => {
		const publicPaths = ['/signup', '/login', '/school']
		return publicPaths.includes(path)
	}

	useEffect(() => {
		// Redirect user if not logged in
		isNotLoggedIn()

		// If the current path is not public, check if the user is admin
		if (!isPublicPath(path)) {
			isNotAdmin()
		}
	}, [path])

	useEffect(() => {
		const handleLoad = () => setLoading(false)
		window.addEventListener('load', handleLoad)

		return () => {
			window.removeEventListener('load', handleLoad)
		}
	}, [])

	// Determine if Navbar should be shown based on path
	const shouldShowNavbar = !isPublicPath(path)

	return (
		<>
			{loading ? <Loader /> : null}
			{shouldShowNavbar && <Navbar />}
			{routes}
		</>
	)
}

export default App
