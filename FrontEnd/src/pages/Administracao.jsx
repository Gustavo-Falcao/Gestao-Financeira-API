import { useState } from "react"

function Administracao( {setPropsInfoPopup} ) {
    const [isLoading, setIsLoading] = useState(true)

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
                    className={`admin-summary-value ${isLoading && "skeleton skeleton-xl"}`}
                    id="admin-total-users">0</div>
                </div>
                <div className="admin-summary-card">
                    <div className="admin-summary-label">Administradores</div>
                    <div 
                    className={`admin-summary-value ${isLoading && "skeleton skeleton-xl"}`}
                    id="admin-total-admins">0</div>
                </div>
            </div>

            <div className="admin-table-wrap">
                {
                    isLoading ?
                        <div className="loading-block">
                            <div className="loading-block-spinner"></div>
                            <span className="loading-block-text">Carregando dados</span>
                            <div className="loading-block-bar"></div>
                        </div>
                    :
                        <table className="admin-table">
                            <thead>
                            <tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Criado em</th><th></th></tr>
                            </thead>
                            <tbody id="admin-users-tbody">
                            <tr><td colSpan="5" className="empty-row">Nenhum usuário encontrado.</td></tr>
                            </tbody>
                        </table>
                }
            </div>
        </section>
    )
}

export default Administracao