function Transacoes() {
    return (
        <section id="tab-transacoes" className="tab">
            <div className="page-header">
            <div>
                <h2 className="page-title">Transações</h2>
                <p className="page-sub">Registre e acompanhe suas movimentações</p>
            </div>
            <button className="btn-primary" >+ Nova Transação</button>
            </div>
            <div className="filter-bar">
            <select id="filter-tipo" >
                <option value="">Todos os tipos</option>
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
            </select>
            <select id="filter-conta" >
                <option value="">Todas as contas</option>
            </select>
            <input type="month" id="filter-mes"/>
            </div>
            <div className="txn-table-wrap">
            <table className="txn-table">
                <thead>
                <tr><th>Descrição</th><th>Tipo</th><th>Categoria</th><th>Conta</th><th>Data</th><th>Valor</th><th></th></tr>
                </thead>
                <tbody id="txn-tbody">
                <tr><td colspan="7" class="empty-row">Nenhuma transação encontrada.</td></tr>
                </tbody>
            </table>
            </div>
        </section>
    )
}

export default Transacoes