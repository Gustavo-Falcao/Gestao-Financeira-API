import { useEffect, useState, useRef } from "react"
import BackGroundModal from "../components/BackGroundModal"
import ModalCategoria from "../components/ModalCategoria"
import { apiHttpMethodHandler } from "../helpers/apiFetch"
import ModalDeletar from "../components/ModalDeletar"

function Categorias({setPropsInfoPopup}) {
    const { apiFetch } = apiHttpMethodHandler();

    const [categorias, setCategorias] = useState([])
    const isCategoriasEmpty = categorias.length < 1;
    const [isBackGroundModalOpen, setIsBackGroundModalOpen] = useState(false)
    const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false)
    const [isModalDeletarCategoriaOpen, setIsModalDeletarCategoriaOpen] = useState(false)
    const categoriaSerEditada = useRef(null)
    const idCategoriaSerDeletada = useRef(null)
    const modeModalCategoria = useRef(null)

    useEffect(() => {
        carregarCategorias()
    }, [])

    async function carregarCategorias() {
        const response = await apiFetch("/categorias")

        if(!response) return

        const data = await response.json();

        setCategorias(data);
    }

    function abrirModalCategoriaToCreate() {
        setIsCategoriaModalOpen(true)
        setIsBackGroundModalOpen(true)
        modeModalCategoria.current = "create"
    }
    
    function fecharModalCategoria() {
        setIsCategoriaModalOpen(false)
        setIsBackGroundModalOpen(false)
        modeModalCategoria.current = null   
    }

    function abrirModalCategoriaToEdit() {
        setIsCategoriaModalOpen(true)
        setIsBackGroundModalOpen(true)
        modeModalCategoria.current = "edit"
    }
    

    async function criarCategoria(categoriaCreateRequest) {
        const response = await apiFetch("/categorias", {
            method: "POST",
            body: JSON.stringify(categoriaCreateRequest)
        })

        if(!response) return

        setPropsInfoPopup({msg: "Categoria criada com sucesso", type: "success", isOpen: true})

        fecharModalCategoria()
        carregarCategorias()
    } 

    async function editarCategoria(categoriaEditRequest) {
        
    }

    async function deletarCategoria() {
        const idCategoriaToDelete = idCategoriaSerDeletada.current
        const response = await apiFetch(`/categorias/${idCategoriaToDelete}`, {
            method: "DELETE"
        })

        if(response.status === 409) {
            const data = await response.json()
            setPropsInfoPopup({msg: data.message, type: "error", isOpen: true})
        }

        if(response.status === 200) {
            setPropsInfoPopup({msg: "Categoria deletada com sucesso!", type: "success", isOpen: true})
        }

        fecharModalDeletarCategoria()
        
    }

    function abrirModalDeletarCategoria() {
        setIsModalDeletarCategoriaOpen(true)
        setIsBackGroundModalOpen(true)
    }

    function fecharModalDeletarCategoria() {
        setIsModalDeletarCategoriaOpen(false)
        setIsBackGroundModalOpen(false)
    }


    function actionsCategoria(e) {
        const target = e.target

        const cardElement = target.closest('.cat-card')

        if(!cardElement) return

        const categoriaId = cardElement.dataset.id

        if(target.tagName === 'BUTTON') {
            const actionType = target.dataset.action
            if(actionType === "editar") {
                const categoriaEncontrada = categorias.find(c => c.id === categoriaId) ?? null
                categoriaSerEditada.current = categoriaEncontrada
                abrirModalCategoriaToEdit()
            } 
            
            if(actionType === "deletar") {
                idCategoriaSerDeletada.current = categoriaId
                
                abrirModalDeletarCategoria()
            }
        }
    }

    return (
        <>
        <section id="tab-categorias" className="tab active">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Categorias</h2>
                    <p className="page-sub">Organize suas transações por categoria</p>
                </div>
                <button className="btn-primary" onClick={abrirModalCategoriaToCreate}>+ Nova Categoria</button>
            </div>
                <div className="cat-grid" id="cat-grid" onClick={actionsCategoria}>
                    {isCategoriasEmpty ?
                        <div className="empty-state">Nenhuma categoria cadastrada ainda.</div>
                    :
                        categorias.map((categoria) => 
                                <div className="cat-card" data-id={categoria.id} key={categoria.id}>
                                <div className="cat-info">
                                    <div className="cat-nome">{categoria.nome}</div>
                                    <span className={`cat-tipo-badge ${categoria.tipoMovimentacao === "Receita" ? 'receita' : 'despesa'}`}>
                                    {categoria.tipoMovimentacao}
                                    </span>
                                </div>
                                <div className="cat-actions">
                                    <button 
                                    className="btn-icon" 
                                    data-action="editar"
                                    >✏</button>
                                    <button 
                                    className="btn-icon danger" 
                                    data-action="deletar"
                                    >✕</button>
                                </div>
                                </div>
                        )
                }
            </div>
        </section>
        
        <BackGroundModal isOpen={isBackGroundModalOpen}>
            <ModalCategoria 
            isOpen={isCategoriaModalOpen}
            onClose={fecharModalCategoria} 
            onSubmit={modeModalCategoria.current === "edit" ? editarCategoria :  criarCategoria} 
            setPropsInfoPopup={setPropsInfoPopup}
            categoriaToEdit={categoriaSerEditada.current}
            />
            <ModalDeletar 
            isOpen={isModalDeletarCategoriaOpen}
            onCancelar={fecharModalDeletarCategoria}
            onExcluir={deletarCategoria}
            nomeDeletar={"Categoria"}
            />
        </BackGroundModal>
        
        </>
    )
}

export default Categorias