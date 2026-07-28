import { useState } from "react"

function ModalCategoria({ isOpen, onClose, onSubmit, setPropsInfoPopup, modeModal, categoriaToEdit }) {
    if(!isOpen) return null
    
    const [inputNomeCategoria, setInputNomeCategoria] = useState(categoriaToEdit?.nome ?? "")
    const [inputTipoMovimentacaoEscolhida, setInputTipoMovimentacaoEscolhida] = useState(categoriaToEdit?.tipoMovimentacao ?? "")
    
    function isEntradasCreateValidas() {
        if(!inputNomeCategoria) {
            setPropsInfoPopup({msg: "Nome é obrigatório", type: "error", isOpen: true})
            return false
        }

        if(inputNomeCategoria.length < 2) {
            setPropsInfoPopup({msg: "Nome deve ter pelo menos 2 letras", type: "error", isOpen: true})
            return false
        }

        if(!inputTipoMovimentacaoEscolhida || !inputTipoMovimentacaoEscolhida.length) {
            setPropsInfoPopup({msg: "Tipo movimentação é obrigatório!", type: "error", isOpen: true})
            return false
        }

        return true
    }

    function handleSubmitCategoria() {
        if(modeModal === "create") {
            submitCreate()
        }
        else if(modeModal === "edit") {
            submitEdit()
        }
        else {
            return
        }   
    }
    
    function convertTipoMovimentacaoStringToEnum(tipoMovimentacaoString) {
        return tipoMovimentacaoString === "Receita" ? "1" : tipoMovimentacaoString === "Despesa" ? "2" : "0"
    }

    function submitCreate() {
        if(!isEntradasCreateValidas()) return
    
        const tipoMovimentacao = convertTipoMovimentacaoStringToEnum(inputTipoMovimentacaoEscolhida)

        const requestCreateCategoria = {
            nome: inputNomeCategoria,
            tipoMovimentacao: Number(tipoMovimentacao) ?? 0
        }

        onSubmit(requestCreateCategoria);
    }


    function submitEdit() {

        let editRequest = {}
        let changes = false

        if(inputNomeCategoria !== categoriaToEdit.nome) {
            editRequest = {...editRequest, nome: inputNomeCategoria}
            changes = true
        }

        if(inputTipoMovimentacaoEscolhida !== categoriaToEdit.tipoMovimentacao) {
            const tipoMovimentacaoEnum = convertTipoMovimentacaoStringToEnum(inputTipoMovimentacaoEscolhida)
            editRequest = {...editRequest, tipoMovimentacao: tipoMovimentacaoEnum}
            changes = true
        }
        
        if(changes) {
            onSubmit(editRequest)
        }
        else {
            onClose()
        }

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