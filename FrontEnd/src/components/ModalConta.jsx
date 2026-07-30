import { use, useState } from "react"
import { handleCurrency } from "../helpers/handleCurrency.js";

function ModalConta({ isOpen, onClose, setPropsInfoPopup, onSubmit, modeModal, contaEdit }) {
    const { formatarDinheiroVindoApi, formatarDinheiroInput, converterMoedaBRParaNumero } = handleCurrency();
    const [nomeContaInput, setNomeContaInput] = useState(contaEdit?.nome ?? "")
    const [saldoIncialInput, setSaldoIncialInput] = useState(() => {
        return contaEdit ? formatarDinheiroVindoApi(contaEdit?.saldoInicial) : ""
    })
    const [tipoContaEscolhido, setTipoContaEscolhido] = useState(contaEdit?.tipoConta ?? "")

    if(!isOpen) return null

    function handleEnumTipoConta(tipoConta) {
        return tipoConta === "Corrente" ? "1" : tipoConta === "Poupanca" ? "2" : tipoConta === "Carteira" ? "3" : ""
    }

    function handleInputDinheiro(e) {
        let valorDigitado = e.target.value;

        valorDigitado = valorDigitado.replace(/\D/g,"")

        setSaldoIncialInput(formatarDinheiroInput(valorDigitado));
    }

    function validarCampos(valorSerSalvo) {
        if(!nomeContaInput) {
            setPropsInfoPopup({msg: "Nome da conta é obrigatório.", type: "error", isOpen: true})
            return false
        }

        if(nomeContaInput.length < 2) {
            setPropsInfoPopup({msg: "Nome da conta deve ter pelo menos 2 letras.", type: "error", isOpen: true})
            return false
        }

        if(nomeContaInput.length > 50) {
            setPropsInfoPopup({msg: "Nome da conta deve ter no máximo 50 letras.", type: "error", isOpen: true})
            return false
        }

        if(!saldoIncialInput) {
            setPropsInfoPopup({msg: "Saldo inicial é obrigatório.", type: "error", isOpen: true})
            return false
        }
        
        valorSerSalvo = converterMoedaBRParaNumero(saldoIncialInput);

        if(valorSerSalvo < 0) {
            setPropsInfoPopup({msg: "Saldo inicial não pode ser negativo", type: "error", isOpen: true})
            return false
        }

        return true
    }

    function handleSubmit() {
        if(modeModal === "edit") {
            submitEdit()
        }
        else if(modeModal === "create") {
            submitCreate()
        }
        else {
            return
        }
    }

    function submitCreate() {
        const valorSerSalvo = converterMoedaBRParaNumero(saldoIncialInput);
        if(!validarCampos(valorSerSalvo)) return

        const enumTipoConta = handleEnumTipoConta(tipoContaEscolhido)

        const requestCreateConta = {
            nome: nomeContaInput,
            tipoConta: Number(enumTipoConta),
            saldoInicial: valorSerSalvo
        } 

        onSubmit(requestCreateConta)
    }

    function submitEdit() {
        let editRequest = {}
        let changes = false

        if(nomeContaInput !== contaEdit?.nome) {
            editRequest = {...editRequest, nome: nomeContaInput}
            changes = true
        }

        if(saldoIncialInput) {
            const valorNumericoSaldoInicial = converterMoedaBRParaNumero(saldoIncialInput)

            if(valorNumericoSaldoInicial != contaEdit?.saldoInicial) {
                editRequest = {...editRequest, saldoInicial: valorNumericoSaldoInicial}
                changes = true
            }
        }

        if(tipoContaEscolhido !== contaEdit?.tipoConta) {
            const tipoContaEnum = handleEnumTipoConta(tipoContaEscolhido)
            editRequest = {...editRequest, tipoConta: Number(tipoContaEnum)}
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
                    <h3 id="modal-conta-title">Nova Conta</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Nome da Conta</label>
                        <input 
                        type="text" 
                        id="conta-nome" 
                        placeholder="Ex: Nubank, Poupança..." 
                        value={nomeContaInput}
                        onChange={(e) => setNomeContaInput(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipo de Conta</label>
                        <select 
                        id="conta-tipo"
                        value={tipoContaEscolhido}
                        onChange={(e) => setTipoContaEscolhido(e.target.value)}
                        >
                            <option value="">Tipo</option>
                            <option value="Corrente">Corrente</option>
                            <option value="Poupanca">Poupança</option>
                            <option value="Carteira">Carteira</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Saldo Inicial (R$)</label>
                        <input
                        type="text" 
                        id="conta-saldo" 
                        placeholder="0,00"   
                        value={saldoIncialInput}
                        onChange={(handleInputDinheiro)}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button 
                    className="btn-ghost"
                    onClick={onClose}
                    >Cancelar</button>
                    <button className="btn-primary" onClick={handleSubmit} >Salvar</button>
                </div>
            </div>



    )

}

export default ModalConta