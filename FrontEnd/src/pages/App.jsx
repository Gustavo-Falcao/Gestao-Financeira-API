import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './Login'
import PrivateRoute from '../components/PrivateRoute'
import DashBoard from './DashBoard'
import Contas from './Contas'
import Transacoes from './Transacoes'
import Categorias from './Categorias'
import Cadastro from './Cadastro'
import InfoPopup from "../components/InfoPopup.jsx";
import SideBar from '../components/SideBar.jsx'

function App() {
  const [propsInfoPopup, setPropsInfoPopup] = useState({
        msg: "",
        type: "",
        isOpen: false
    })
  
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login setPropsInfoPopup={setPropsInfoPopup}/>} />
      <Route path='/cadastro' element={<Cadastro setPropsInfoPopup={setPropsInfoPopup}/>}/>

      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Navigate to="/dashboard" replace />}/>
        <Route path='/dashboard' element={<DashBoard />}/>
        <Route path='/contas' element={<Contas setPropsInfoPopup={setPropsInfoPopup}/>}/>
        <Route path='/transacoes' element={<Transacoes setPropsInfoPopup={setPropsInfoPopup} />}/>
        <Route path='/categorias' element={<Categorias setPropsInfoPopup={setPropsInfoPopup}/>}/>
      </Route>
    </Routes>

    <InfoPopup msg={propsInfoPopup.msg} type={propsInfoPopup.type} isOpen={propsInfoPopup.isOpen} onClose={() => setPropsInfoPopup({msg: "", type: "", isOpen: false})}/>
    </>

  )
}

export default App
