import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './Login'
import PrivateRoute from '../components/PrivateRoute'
import DashBoard from './DashBoard'
import Contas from './Contas'
import Transacoes from './Transacoes'
import Categorias from './Categorias'
import Cadastro from './Cadastro'

function App() {
  
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/cadastro' element={<Cadastro />}/>

      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Navigate to="/dashboard" replace />}/>
        <Route path='/dashboard' element={<DashBoard />}/>
        <Route path='/contas' element={<Contas />}/>
        <Route path='/transacoes' element={<Transacoes />}/>
        <Route path='/categorias' element={<Categorias />}/>
      </Route>
    </Routes>

  )
}

export default App
