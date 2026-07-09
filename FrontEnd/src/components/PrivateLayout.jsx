import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

function PrivateLayout() {
    return (
        <div className="app-shell active">
            <SideBar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    )
}

// export default PrivateLayout