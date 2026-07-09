import { Navigate, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { apiHttpMethodHandler } from "../helpers/apiFetch" 
import SideBar from "./SideBar"

function PrivateRoute() {
    const token = localStorage.getItem("token")
    
    if(!token) {
        return <Navigate to={"/login"} replace />
    }
    const { apiFetch } = apiHttpMethodHandler()
    const [userProfileData, setUserProfileData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        carregarUsuario()
    }, [])

    async function carregarUsuario(params) {
        const response = await apiFetch("/users/me")

        if(!response) return;

        const data = await response.json();

        setUserProfileData(data)
        setIsLoading(false)
    }
    
    return (
        <div className="app-shell active">
            <SideBar userProfile={userProfileData} isLoading={isLoading}/>
            <main className='main-content'>
                <Outlet context={{ userProfileData }}/>
            </main>
        </div>
    )
}

export default PrivateRoute