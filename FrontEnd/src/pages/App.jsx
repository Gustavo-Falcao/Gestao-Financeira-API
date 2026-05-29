import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './Login'
import PrivateRoute from '../components/PrivateRoute'

function App() {
  
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path='/' />
        <Route />
      </Route>
    </Routes>

  )
}

export default App
