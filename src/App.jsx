import './App.css'
import MainPage from './pages/mainpage'
import {Routes,Route} from 'react-router-dom'
function App() {
 

  return (
     
     <Routes>
      <Route path='/' element={<MainPage/>}></Route>
     </Routes>
  )
}

export default App
