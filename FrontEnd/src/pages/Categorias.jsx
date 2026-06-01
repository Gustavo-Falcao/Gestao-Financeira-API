function Categorias() {
    return (
        <section id="tab-categorias" className="tab">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Categorias</h2>
                    <p className="page-sub">Organize suas transações por categoria</p>
                </div>
                <button className="btn-primary" >+ Nova Categoria</button>
            </div>
                <div className="cat-grid" id="cat-grid">
                <div className="empty-state">Nenhuma categoria cadastrada ainda.</div>
            </div>
        </section>
    )
}

export default Categorias