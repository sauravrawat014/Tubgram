import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Bookmark from './pages/Bookmark'


function App() {
  

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/bookmark' element={<Bookmark/>}/>
      
     </Routes>
    </>
  )
}

export default App
