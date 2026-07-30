import { useEffect, useState } from "react"
import { data } from "react-router-dom";
import { apiHttpMethodHandler } from "../helpers/apiFetch";
import { handleCurrency } from "../helpers/handleCurrency.js";

function ModalTransacao({ isOpen, onClose, onSubmit, setPropsInfoPopup, categorias, contas, modeModal, transacaoEdit }) {
    const { apiFetch } = apiHttpMethodHandler();
    const { formatarDinheiroVindoApi, formatarDinheiroInput, converterMoedaBRParaNumero } = handleCurrency();
    const [inputDescricao, setInputDescricao] = useState(transacaoEdit?.descricao ?? "");
    const [tipoMovimentacao, setTipoMovimentacao] = useState(handleTipoMovimentacao(transacaoEdit?.tipoMovimentacao) ?? "")
    const [inputValorTransacao, setInputValorTransacao] = useState(() => {
        return transacaoEdit ? formatarDinheiroVindoApi(transacaoEdit?.valor) : ""
    }
    )
    const [contaEscolhida, setContaEscolhida] = useState(transacaoEdit?.contaId ?? "")
    const [categoriaEscolhida, setCategoriaEscolhida] = useState(transacaoEdit?.categoriaId ?? "")
    const [inputData, setInputData] = useState(transacaoEdit?.data ?? "")
    const categoriasFiltradas = filtrarCategoriasByTipoTransacao()

    function filtrarCategoriasByTipoTransacao() {
        const tipoTransacao = tipoMovimentacao === "1" ? 
        "Receita" : tipoMovimentacao === "2" ?
        "Despesa" : "";

        return categorias.filter(categoria => {
            const filterByTipoTransacao = tipoTransacao === "" || categoria.tipoMovimentacao === tipoTransacao 

            return filterByTipoTransacao
        })
    }

    function handleTipoMovimentacao(tipoMovimentacao) {
        return tipoMovimentacao === "Receita" ? "1" : tipoMovimentacao === "Despesa" ? "2" : ""
    }

    function handleInputDinheiro(e) {
        let valorDigitado = e.target.value;

        valorDigitado = valorDigitado.replace(/\D/g,"")

        setInputValorTransacao(formatarDinheiroInput(valorDigitado));
    }

    function isCamposValidos(valorNumerico) {
        if(!inputDescricao) {
            setPropsInfoPopup({msg: "Descrição é obrigatório", type: "error", isOpen: true})
            return false
        }

        if(inputDescricao.length < 2) {
            setPropsInfoPopup({msg: "Descição deve ter pelo menos 2 caracteres", type: "error", isOpen: true})
            return false
        }

        if(valorNumerico < 1) {
            setPropsInfoPopup({msg: "Valor transação deve ser maior que 0", type: "error", isOpen: true})
            return false
        }

        if(!tipoMovimentacao) {
            setPropsInfoPopup({msg: "Tipo da transação é obrigatório", type: "error", isOpen: true})
            return false
        }

        if(!inputData) {
            setPropsInfoPopup({msg: "Data da tansação é obrigatório", type: "error", isOpen: true})
            return false
        }

        if(!contaEscolhida) {
            setPropsInfoPopup({msg: "Conta é obrigatória", type: "error", isOpen: true})
            return false
        }

        if(!categoriaEscolhida) {
            setPropsInfoPopup({msg: "Categoria é obrigatória", type: "error", isOpen: true})
            return false
        }

        return true

    }

    function handleSubmit() {
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
        const valorNumerico = converterMoedaBRParaNumero(inputValorTransacao)

        if(isCamposValidos(valorNumerico)) {
            const transacaoCreateRequest = {
                descricao: inputDescricao,
                valor: valorNumerico,
                tipoMovimentacao: Number(tipoMovimentacao),
                data: inputData,
                contaId: contaEscolhida,
                categoriaId: categoriaEscolhida
            }
    
            onSubmit(transacaoCreateRequest)
        }
    }

    function submitEdit() {
        let editRequest = {}
        let changes = false

        if(inputDescricao !== transacaoEdit?.descricao) {
            editRequest = {...editRequest, descricao: inputDescricao.trim()}
            changes = true
        }

        if(tipoMovimentacao) {
            const tipoMovimentacaoEnum = handleTipoMovimentacao(transacaoEdit?.tipoMovimentacao)
            if(tipoMovimentacao !== tipoMovimentacaoEnum) {
                editRequest = {...editRequest, tipoMovimentacao: Number(tipoMovimentacao)}
                changes = true
            }
        }

        if(inputValorTransacao) {
            const valorNumericoTransacao = converterMoedaBRParaNumero(inputValorTransacao)

            if(valorNumericoTransacao !== transacaoEdit?.valor) {
                editRequest = {...editRequest, valor: valorNumericoTransacao}
                changes = true
            }
        }

        //conta
        if(contaEscolhida !== transacaoEdit?.contaId) {
            editRequest = {...editRequest, contaId: contaEscolhida}
            changes = true
        }

        //categoria
        if(categoriaEscolhida !== transacaoEdit?.categoriaId) {
            editRequest = {...editRequest, categoriaId: categoriaEscolhida}
            changes = true
        }

        //data
        if(inputData !== transacaoEdit?.data) {
            editRequest = {...editRequest, data: inputData}
            changes = true
        }

        if(!changes){
            onClose()
            console.log("Nada mudou, fechar")
            return
        }

        console.log(editRequest)
        onSubmit(editRequest)
    }

    if(!isOpen) return null

    return(
        <div className="modal">
        <div className="modal-header">
            <h3 id="modal-transacao-title">Nova Transação</h3>
            <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
            <input type="hidden" id="txn-id" />
            <div className="form-group">
            <label>Descrição</label>
            <input 
            type="text" 
            id="txn-desc" 
            placeholder="Ex: Salário, Aluguel..." 
            value={inputDescricao}
            onChange={(e) => setInputDescricao(e.target.value)}
            />
            </div>
            <div className="form-row">
            <div className="form-group">
                <label>Tipo</label>
                <select 
                id="txn-tipo" 
                value={tipoMovimentacao} 
                onChange={(e) => setTipoMovimentacao(e.target.value)}
                >
                    <option value="">Tipo Transação</option>
                    <option value="1">Receita</option>
                    <option value="2">Despesa</option>
                </select>
            </div>
            <div className="form-group">
                <label>Valor (R$)</label>
                <input 
                type="text" 
                id="txn-valor" 
                placeholder="0,00"
                value={inputValorTransacao}
                onChange={handleInputDinheiro}
                />
            </div>
            </div>
            <div className="form-row">
            <div className="form-group">
                <label>Data</label>
                <input 
                type="date" 
                id="txn-data" 
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Conta</label>
                <select id="txn-conta" value={contaEscolhida} onChange={(e) => setContaEscolhida(e.target.value)}>
                    <option value="">conta</option>
                    {contas.map((conta) => 
                        <option key={conta.id} value={conta.id}>{conta.nome}</option>
                    )}
                </select>
            </div>
            </div>
            <div className="form-group">
                <label>Categoria</label>
                <select 
                id="txn-cat" 
                value={categoriaEscolhida} 
                onChange={(e) => setCategoriaEscolhida(e.target.value)}
                >
                    <option value="">categoria</option>
                    {categoriasFiltradas.map((categoria) => 
                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    )}
                </select>
            </div>
        </div>
        <div className="modal-footer">
            <button className="btn-ghost" onClick={onClose}>Cancelar</button>
            <button className="btn-primary" onClick={handleSubmit}>Salvar</button>
        </div>
    </div>
    )
}

export default ModalTransacao