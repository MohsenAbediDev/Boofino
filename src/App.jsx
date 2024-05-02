import { useRoutes } from 'react-router-dom'
import { isNotLoggedIn } from './utils/utils'
import Routes from './Routes' //? All Routes In This File 
import Navbar from './Common/Components/Navbar'

function App() {
  const routes = useRoutes(Routes)
  const path = window.location.pathname

  // When user is not logged in redirected to signup page
  isNotLoggedIn()

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
