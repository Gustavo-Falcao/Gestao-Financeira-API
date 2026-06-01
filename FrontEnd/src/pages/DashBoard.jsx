function DashBoard() {
    return (
        <section id="tab-dashboard" className="tab active">
            <div className="page-header">
            <h2 className="page-title">Dashboard</h2>
            <p className="page-sub" id="dash-greeting">Olá! Aqui está o resumo das suas finanças.</p>
            </div>
            <div className="kpi-grid" id="kpi-grid">
            <div className="kpi-card kpi-receita">
                <div className="kpi-label">Total Receitas</div>
                <div className="kpi-value" id="kpi-receita">R$ 0,00</div>
                <div className="kpi-badge">↑ ENTRADA</div>
            </div>
            <div className="kpi-card kpi-despesa">
                <div className="kpi-label">Total Despesas</div>
                <div className="kpi-value" id="kpi-despesa">R$ 0,00</div>
                <div className="kpi-badge">↓ SAÍDA</div>
            </div>
            <div className="kpi-card kpi-saldo">
                <div className="kpi-label">Saldo Geral</div>
                <div className="kpi-value" id="kpi-saldo">R$ 0,00</div>
                <div className="kpi-badge">◈ LÍQUIDO</div>
            </div>
            <div className="kpi-card kpi-contas">
                <div className="kpi-label">Contas Ativas</div>
                <div className="kpi-value" id="kpi-contas">0</div>
                <div className="kpi-badge">▣ CONTAS</div>
            </div>
            </div>
            <div className="dash-grid">
            <div className="dash-card">
                <div className="dash-card-title">Transações Recentes</div>
                <div id="dash-recent" className="txn-list-mini"></div>
            </div>
            <div className="dash-card">
                <div className="dash-card-title">Contas</div>
                <div id="dash-contas" className="contas-mini"></div>
            </div>
            </div>
        </section>
    )
}

export default DashBoard