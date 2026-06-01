import { useState } from "react"

function ModalCategoria({ isOpen, onClose, onCreate, setPropsInfoPopup }) {
    
    const [inputNomeCategoria, setInputNomeCategoria] = useState("")
    const [inputTipoMovimentacaoEscolhida, setInputTipoMovimentacaoEscolhida] = useState("")

    if(!isOpen) return null

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

    function handleCreateCategoria() {
        
        validacaoEntradas()

        const requestCreateCategoria = {
            nome: inputNomeCategoria,
            tipoMovimentacao: Number(inputTipoMovimentacaoEscolhida)
        }

        onCreate(requestCreateCategoria);
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
                    <option value="1">Receita</option>
                    <option value="2">Despesa</option>
                </select>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-ghost" onClick={onClose}>Cancelar</button>
                <button className="btn-primary" onClick={handleCreateCategoria}>Salvar</button>
            </div>
        </div>
    )
}

export default ModalCategoria