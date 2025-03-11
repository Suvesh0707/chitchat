import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Homepage from './pages/HomePage'
import Signup from './pages/Signup'
import Chat from './pages/Chat'

function App() {
  return (  
    <>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/homepage' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
      
    </>
  )
}

export default App