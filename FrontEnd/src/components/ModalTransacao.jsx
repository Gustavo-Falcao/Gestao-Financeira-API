import { useEffect, useState } from "react"
import { data } from "react-router-dom";
import { apiHttpMethodHandler } from "../helpers/apiFetch";

function ModalTransacao({ isOpen, onClose, onCreate, setPropsInfoPopup, categorias, contas }) {
    const { apiFetch } = apiHttpMethodHandler();
    const [inputDescricao, setInputDescricao] = useState("");
    const [tipoTransacaoEscolhida, setTipoTransacaoEscolhida] = useState("1")
    const [inputValorTransacao, setInputValorTransacao] = useState("")
    const [contaEscolhida, setContaEscolhida] = useState("")
    const [categoriaEscolhida, setCategoriaEscolhida] = useState("")
    const [inputData, setInputData] = useState("")

    console.log("Contas abaixo");
    console.log(contas)
    console.log("categorias abaixo")
    console.log(categorias)

    function formatarDinheiro(valor) {
        const valorNumerico = Number(valor) / 100

        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valorNumerico)

        return valorFormatado
    }

    function converterMoedaBRParaNumero(valor) {
        return Number(valor
            .replace("R$", "")
            .trim()
            .replace(/\./g, "")
            .replace(",", ".")
        )
    }

    function handleInputDinheiro(e) {
        let valorDigitado = e.target.value;

        valorDigitado = valorDigitado.replace(/\D/g,"")

        setInputValorTransacao(formatarDinheiro(valorDigitado));
    }

    function validarCampos(valorNumerico) {
        if(!inputDescricao) {
            setPropsInfoPopup({msg: "Descrição é obrigatório", type: "error", isOpen: true})
            return
        }

        if(inputDescricao.length < 2) {
            setPropsInfoPopup({msg: "Descição deve ter pelo menos 2 caracteres", type: "error", isOpen: true})
            return
        }

        if(valorNumerico < 1) {
            setPropsInfoPopup({msg: "Valor transação deve ser maior que 0", type: "error", isOpen: true})
            return
        }

        if(!tipoTransacaoEscolhida) {
            setPropsInfoPopup({msg: "Tipo da transação é obrigatório", type: "error", isOpen: true})
            return
        }

        if(!inputData) {
            setPropsInfoPopup({msg: "Data da tansação é obrigatório", type: "error", isOpen: true})
            return
        }

        if(!contaEscolhida) {
            setPropsInfoPopup({msg: "Conta é obrigatória", type: "error", isOpen: true})
            return
        }

        if(!categoriaEscolhida) {
            setPropsInfoPopup({msg: "Categoria é obrigatória", type: "error", isOpen: true})
            return
        }


    }

    function handleCreate() {
        const valorNumerico = converterMoedaBRParaNumero(inputValorTransacao)

        validarCampos(valorNumerico)

        const transacaoCreateRequest = {
            descricao: inputDescricao,
            valor: valorNumerico,
            tipoMovimentacao: Number(tipoTransacaoEscolhida),
            data: inputData,
            contaId: contaEscolhida,
            categoriaId: categoriaEscolhida
        }

        onCreate(transacaoCreateRequest)
    }

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
                <select id="txn-tipo" value={tipoTransacaoEscolhida} onChange={(e) => setTipoTransacaoEscolhida(e.target.value)}>
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
                    <option value={""}>conta</option>
                    {contas.map((conta) => 
                        <option key={conta.id} value={conta.id}>{conta.nome}</option>
                    )}
                </select>
            </div>
            </div>
            <div className="form-group">
            <label>Categoria</label>
            <select id="txn-cat" value={categoriaEscolhida} onChange={(e) => setCategoriaEscolhida(e.target.value)}>
                <option value={""}>categoria</option>
                {categorias.map((categoria) => 
                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                )}
            </select>
            </div>
        </div>
        <div className="modal-footer">
            <button className="btn-ghost" onClick={onClose}>Cancelar</button>
            <button className="btn-primary" onClick={handleCreate}>Salvar</button>
        </div>
    </div>
    )
}

export default ModalTransacao