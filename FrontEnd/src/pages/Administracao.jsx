function Administracao() {
    return (
        <section id="tab-admin" className="tab">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Administração</h2>
                    <p className="page-sub">Visualize os usuários cadastrados e gerencie permissões</p>
                </div>
            </div>

            <div className="admin-summary">
                <div className="admin-summary-card">
                    <div className="admin-summary-label">Usuários cadastrados</div>
                    <div className="admin-summary-value" id="admin-total-users">0</div>
                </div>
                <div className="admin-summary-card">
                    <div className="admin-summary-label">Administradores</div>
                    <div className="admin-summary-value" id="admin-total-admins">0</div>
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                    <tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Criado em</th><th></th></tr>
                    </thead>
                    <tbody id="admin-users-tbody">
                    <tr><td colspan="5" class="empty-row">Nenhum usuário encontrado.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Administracao