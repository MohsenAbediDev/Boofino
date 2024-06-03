import { useRoutes } from 'react-router-dom'
import { isNotLoggedIn, isNotAdmin } from './utils/utils'
import Routes from './Routes' //? All Routes In This File 
import Navbar from './Common/Components/Navbar'

function App() {
  const routes = useRoutes(Routes)
  const path = window.location.pathname

  // When user is not loggedin redirected to signup page
  isNotLoggedIn()

  // When user is not admin redirected to home page
  isNotAdmin()

  return (
    <>
      {
        path === '/signup' || path === '/login' || path === '/school' ? '' : <Navbar/>
      }
      {routes}
    </>
  )
}

export default App
