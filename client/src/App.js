//import useLocalStorage from './hooks/useLocalStorage'
import { SocketProvider } from './context/SocketProvider' 
import { CartEventsProvider } from './context/CartEventsProvider'
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  //const [id, setId] = useLocalStorage('id')

  return (
    <SocketProvider id="1">
      <CartEventsProvider>
        <Dashboard/>
      </CartEventsProvider>
    </SocketProvider>
  )
}

export default App;
