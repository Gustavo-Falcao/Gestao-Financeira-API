import { NavLink } from "react-router-dom"

function SideBar() {
    return (
        <aside className="sidebar">
            <div className="sb-brand">
                <span className="brand-icon">◈</span>
                <span className="brand-name">Finanza</span>
            </div>
            <nav className="sb-nav">
                <NavLink 
                to={"/dashboard"}
                className={"sb-link active"}
                >
                    <span className="sb-icon">⬡</span>
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
                style={"display: none"}
                >
                    <span class="sb-icon">♛</span> Administração
                </NavLink>
            </nav>
            <div className="sb-footer">
                <div className="sb-user" role="button">
                <div className="sb-avatar" id="sb-avatar">J</div>
                <div>
                    <div className="sb-uname" id="sb-uname">João Silva</div>
                    <div className="sb-urole" id="sb-urole">USER</div>
                </div>
                </div>
                <button className="btn-logout">Sair</button>
            </div>
        </aside>
    )
}

export default SideBar