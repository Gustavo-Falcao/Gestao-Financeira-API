import { Navigate, Outlet } from "react-router-dom"
import SideBar from "./SideBar"

function PrivateRoute() {
    const token = localStorage.getItem("token")

    if(!token) {
        return <Navigate to={"/login"} replace />
    }

    return (
        <div className="app-shell active">
            <SideBar />
            <main className='main-content'>
                <Outlet />
            </main>
        </div>
    )
}

export default PrivateRoute