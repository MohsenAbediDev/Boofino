import { useRoutes } from 'react-router-dom'
import { isNotLoggedIn } from './utils/utils'
import Routes from './Routes' //? All Routes In This File 
import Navbar from './Common/Components/Navbar'

function App() {
  const routes = useRoutes(Routes)
  const path = window.location.pathname

  isNotLoggedIn()
  return (
    <>
      {
        path === '/signup' || path === '/login' ? '' : <Navbar/>
      }
      {routes}
    </>
  )
}

export default App
