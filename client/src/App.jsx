import { useRoutes } from 'react-router-dom'
import Routes from './Routes' //? All Routes In This File 
import Navbar from './Common/Components/Navbar'

function App() {
  const routes = useRoutes(Routes)

  return (
    <>
      <Navbar/>
      {routes}
    </>
  )
}

export default App
