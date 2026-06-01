function Contas() {
    return (
        <section id="tab-contas" className="tab">
            <div className="page-header">
            <div>
                <h2 className="page-title">Contas</h2>
                <p className="page-sub">Gerencie suas contas bancárias e carteiras</p>
            </div>
            <button className="btn-primary">+ Nova Conta</button>
            </div>
            <div className="cards-grid" id="contas-grid">
            <div className="empty-state">Nenhuma conta cadastrada ainda.</div>
            </div>
      </section>
    )
}

export default Contas