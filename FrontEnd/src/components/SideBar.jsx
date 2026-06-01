import { useState } from "react"
import { NavLink, replace, useNavigate } from "react-router-dom"
import { apiHttpMethodHandler } from "../helpers/apiFetch" 

function SideBar() {
    const navigate = useNavigate()
    const { apiFetch } = apiHttpMethodHandler();
    const [simpleUserData, setSimpleUserData] = useState({})
    const firstName = simpleUserData?.nome?.split(" ")[0] ?? ""
    const letterFirstName = simpleUserData?.nome?.trim()[0] ?? ""

    useState(() => {
        carregarUsuario()
    }, [])

    async function carregarUsuario() {
        const response = await apiFetch("/users/me/simple")

        if(!response) return;

        const data = await response.json();

        setSimpleUserData(data)
    }

    function logout() {
        localStorage.removeItem('token') 
        navigate("/login", {replace: true})
    }

    return (
        <aside className="sidebar">
            <div className="sb-brand">
                <span className="brand-icon">◈</span>
                <span className="brand-name">Finanza</span>
            </div>
            <nav className="sb-nav">
                <NavLink 
                to={"/dashboard"}
                className={"sb-link"}
                >
                    <span className="sb-icon">⬡</span> Dashboard
                </NavLink>
                <NavLink 
                to={"/contas"}
                className={"sb-link"}
                >
                    <span className="sb-icon">▣</span> Contas
                </NavLink>
                <NavLink 
                to={"/transacoes"}
                className="sb-link">
                    <span className="sb-icon">⇄</span> Transações
                </NavLink>
                <NavLink 
                to={"/categorias"}
                className="sb-link"
                >
                    <span className="sb-icon">◑</span> Categorias
                </NavLink>
                <NavLink 
                to={"/administracao"}
                className="sb-link admin-only"
                style={{display: simpleUserData.userRole === "ADMIN" ? 'flex' : 'none'}}
                >
                    <span className="sb-icon">♛</span> Administração
                </NavLink>
            </nav>
            <div className="sb-footer">
                <div className="sb-user" role="button">
                <div className="sb-avatar" id="sb-avatar">{letterFirstName}</div>
                <div>
                    <div className="sb-uname" id="sb-uname">{firstName}</div>
                    <div className="sb-urole" id="sb-urole">{simpleUserData.userRole}</div>
                </div>
                </div>
                <button 
                className="btn-logout"
                onClick={logout}
                >Sair</button>
            </div>
        </aside>
    )
}

export default SideBar