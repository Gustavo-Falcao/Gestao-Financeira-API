import { useEffect, useState } from "react"
import { apiHttpMethodHandler } from "../helpers/apiFetch"
import { useOutletContext } from "react-router-dom"

function Administracao( {setPropsInfoPopup} ) {
    const [isDashboardLoading, setIsDashboardLoading] = useState(true)
    const [dashboarAdmin, setDashboarAdmin] = useState(null)
    const { apiFetch } = apiHttpMethodHandler()
    const { userProfileData, isLoading } = useOutletContext();

    useEffect(() => {
        carregarDashboardAdmin()
    }, [])

    async function carregarDashboardAdmin() {
        const response = await apiFetch("/admin/users/dashboard")

        if(!response) return

        const data = await response.json();

        setDashboarAdmin(data)
        setIsDashboardLoading(false)
    }

    return (
        <section id="tab-admin" className="tab active">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Administração</h2>
                    <p className="page-sub">Visualize os usuários cadastrados e gerencie permissões</p>
                </div>
            </div>

            <div className="admin-summary">
                <div className="admin-summary-card">
                    <div className="admin-summary-label">Usuários cadastrados</div>
                    <div 
                    className={`admin-summary-value ${isDashboardLoading && "skeleton skeleton-xl"}`}
                    id="admin-total-users">{!isDashboardLoading && dashboarAdmin.quantUsers}</div>
                </div>
                <div className="admin-summary-card">
                    <div className="admin-summary-label">Administradores</div>
                    <div 
                    className={`admin-summary-value ${isDashboardLoading && "skeleton skeleton-xl"}`}
                    id="admin-total-admins">{!isDashboardLoading && dashboarAdmin.quantAdmin}</div>
                </div>
            </div>

            <div className="admin-table-wrap">
                {
                    isDashboardLoading || isLoading ?
                        <div className="loading-block">
                            <div className="loading-block-spinner"></div>
                            <span className="loading-block-text">Carregando dados</span>
                            <div className="loading-block-bar"></div>
                        </div>
                    :
                        <table className="admin-table">
                            <thead>
                            <tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th></th></tr>
                            </thead>
                            <tbody id="admin-users-tbody">
                            {
                                dashboarAdmin.users.length > 0 ? 
                                dashboarAdmin.users.map((user) => 
                                    <tr key={user.email}>
                                        <td>{user.nome} {(user.email === userProfileData.email) && <span className="page-sub">(você)</span>}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.userRole === "ADMIN" ? 'badge-receita' : 'badge-despesa'}`}>{user.userRole}</span>
                                        </td>
                                        <td>
                                            <div className="admin-actions">
                                                {
                                                user.email !== userProfileData.email && user.userRole === "USER" ? 
                                                <button className="btn-primary">Tornar ADMIN</button>
                                                :
                                                <span className="page-sub">{user.email === userProfileData.email ? "Usuário atual" : "Já é admin"}</span>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            :
                                <tr>
                                    <td colSpan="5" className="empty-row">Nenhum usuário encontrado.</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                }
            </div>
        </section>
    )
}

export default Administracao