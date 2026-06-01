import { useEffect, useState } from "react"
import BackGroundModal from "../components/BackGroundModal"
import ModalCategoria from "../components/ModalCategoria"
import { apiHttpMethodHandler } from "../helpers/apiFetch"

function Categorias({setPropsInfoPopup}) {
    const { apiFetch } = apiHttpMethodHandler();

    const [categorias, setCategorias] = useState([])
    const isCategoriasEmpty = categorias.length < 1;
    const [isBackGroundModalOpen, setIsBackGroundModalOpen] = useState(false)
    const [isCategoriaCreateModalOpen, setIsCategoriaCreateModalOpen] = useState(false)

    useEffect(() => {
        carregarCategorias()
    }, [])

    async function carregarCategorias() {
        const response = await apiFetch("/categorias/byUser")

        if(!response) return

        const data = await response.json();

        setCategorias(data);
    }

    function abrirCreateCategoriaModal() {
        setIsCategoriaCreateModalOpen(true)
        setIsBackGroundModalOpen(true)
    }
    
    function fecharCreateCategoriaModal() {
        setIsCategoriaCreateModalOpen(false)
        setIsBackGroundModalOpen(false)
    }

    async function criarCategoria(categoriaCreateRequest) {
        const response = await apiFetch("/categorias", {
            method: "POST",
            body: JSON.stringify(categoriaCreateRequest)
        })

        if(!response) return

        setPropsInfoPopup({msg: "Categoria criada com sucesso", type: "success", isOpen: true})

        fecharCreateCategoriaModal()
        carregarCategorias()
    } 

    return (
        <>
        <section id="tab-categorias" className="tab active">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Categorias</h2>
                    <p className="page-sub">Organize suas transações por categoria</p>
                </div>
                <button className="btn-primary" onClick={abrirCreateCategoriaModal}>+ Nova Categoria</button>
            </div>
                <div className="cat-grid" id="cat-grid">
                    {isCategoriasEmpty ?
                        <div className="empty-state">Nenhuma categoria cadastrada ainda.</div>
                    :
                        categorias.map((categoria) => 
                                <div className="cat-card" key={categoria.id}>
                                <div className="cat-info">
                                    <div className="cat-nome">{categoria.nome}</div>
                                    <span className={`cat-tipo-badge ${categoria.tipoMovimentacao === "Receita" ? 'receita' : 'despesa'}`}>
                                    {categoria.tipoMovimentacao}
                                    </span>
                                </div>
                                <div className="cat-actions">
                                    <button className="btn-icon" >✏</button>
                                    <button className="btn-icon danger" >✕</button>
                                </div>
                                </div>
                        )
                }
            </div>
        </section>
        
        <BackGroundModal isOpen={isBackGroundModalOpen}>
            <ModalCategoria isOpen={isCategoriaCreateModalOpen} onClose={fecharCreateCategoriaModal} onCreate={criarCategoria} setPropsInfoPopup={setPropsInfoPopup}/>
        </BackGroundModal>
        
        </>
    )
}

export default Categorias