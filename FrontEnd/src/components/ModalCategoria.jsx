import { useState } from "react"

function ModalCategoria({ isOpen, onClose, onSubmit, setPropsInfoPopup, modeModal, categoriaToEdit }) {
    if(!isOpen) return null
    
    const [inputNomeCategoria, setInputNomeCategoria] = useState(categoriaToEdit?.nome ?? "")
    const [inputTipoMovimentacaoEscolhida, setInputTipoMovimentacaoEscolhida] = useState(categoriaToEdit?.tipoMovimentacao ?? "")

    
    function validacaoEntradasCreate() {
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
    
    function submitCreate() {
        validacaoEntradasCreate()
    
        let tipoMovimentacao = ""

        if(inputTipoMovimentacaoEscolhida === "Receita")
            tipoMovimentacao = "1"

        if(inputTipoMovimentacaoEscolhida === "Despesa")
            tipoMovimentacao = "2"

        const requestCreateCategoria = {
            nome: inputNomeCategoria,
            tipoMovimentacao: Number(tipoMovimentacao) ?? 0
        }

        console.log("Submit enviará request para criar categoria, objeto abaixo:")
        console.log(requestCreateCategoria)
        //onSubmit(requestCreateCategoria);
    }

    function submitEdit() {

        let editRequest = {}

        //para adicionar atributo no objeto request
            //o valor da categoria ser editada deve ser diferente da atual mas não uma string vazia

        if(inputNomeCategoria.length < 2 || inputNomeCategoria.length > 100) {
            //informar alerta sobre tamanho necessário para ser inserido
            return
        }
        if(categoriaToEdit.nome !== inputNomeCategoria) {
            //inserir campo de nome no objeto
        }
        

        console.log("Submit enviará request para editar categoria, objeto abaixo:")
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