import { useState } from "react"

function ModalCategoria({ isOpen, onClose, onSubmit, setPropsInfoPopup, modeModal, categoriaToEdit }) {
    if(!isOpen) return null
    
    const [inputNomeCategoria, setInputNomeCategoria] = useState(categoriaToEdit?.nome ?? "")
    const [inputTipoMovimentacaoEscolhida, setInputTipoMovimentacaoEscolhida] = useState(categoriaToEdit?.tipoMovimentacao ?? "")

    
    function validacaoEntradas() {
        if(!inputNomeCategoria) {
            setPropsInfoPopup({msg: "Nome é obrigatório", type: "error", isOpen: true})
            return
        }

        if(inputNomeCategoria.length < 2) {
            setPropsInfoPopup({msg: "Nome deve ter pelo menos 2 letras", type: "error", isOpen: true})
            return
        }
    }

    function handleSubmitCategoria() {
        
        validacaoEntradas()

        let tipoMovimentacao = ""

        if(inputTipoMovimentacaoEscolhida === "Receita")
            tipoMovimentacao = "1"

        if(inputTipoMovimentacaoEscolhida === "Despesa")
            tipoMovimentacao = "2"

        const requestCreateCategoria = {
            nome: inputNomeCategoria,
            tipoMovimentacao: Number(tipoMovimentacao) ?? 0
        }

        onSubmit(requestCreateCategoria);
    }
    
    return(
        <div className="modal">
            <div className="modal-header">
                <h3 id="modal-cat-title">Nova Categoria</h3>
                <button className="modal-close" onClick={onClose}>✕</button>
            </div>
            <div className="modal-body">
                <input type="hidden" id="cat-id" />
                <div className="form-group">
                <label>Nome da Categoria</label>
                <input 
                type="text" 
                id="cat-nome" 
                placeholder="Ex: Alimentação, Transporte..." 
                value={inputNomeCategoria}
                onChange={(e) => setInputNomeCategoria(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label>Tipo de Movimentação</label>
                <select 
                id="cat-tipo"
                value={inputTipoMovimentacaoEscolhida}
                onChange={(e) => setInputTipoMovimentacaoEscolhida(e.target.value)}
                >
                    <option value="" hidden>Movimentacao</option>
                    <option value="Receita">Receita</option>
                    <option value="Despesa">Despesa</option>
                </select>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-ghost" onClick={onClose}>Cancelar</button>
                <button className="btn-primary" onClick={handleSubmitCategoria}>Salvar</button>
            </div>
        </div>
    )
}

export default ModalCategoria