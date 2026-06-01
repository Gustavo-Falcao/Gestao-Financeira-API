import { useState } from "react"

function ModalEditarConta({ isOpen, nomeConta, saldoInicial, tipoConta, onClose, onSave }) {
    const [nomeContaInput, setNomeContaInput] = useState(nomeConta)
    const [saldoIncialInput, setSaldoIncialInput] = useState(() => {
        let valorString = saldoInicial.toString().replace(/\D/g,"");
        
        return formatarDinheiroVindoApi(valorString);

    })
    const [tipoContaEscolhido, setTipoContaEscolhido] = useState(tipoConta)

    if(!isOpen) return null

    console.log(nomeContaInput)
    console.log(saldoIncialInput)
    console.log(tipoContaEscolhido)

    function formatarDinheiroVindoApi(valor) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number(valor));
    }

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

        setSaldoIncialInput(formatarDinheiro(valorDigitado));
    }

    function validarCampos(valorSerSalvo) {
        if(!nomeContaInput) {
            setPropsInfoPopup({msg: "Nome da conta é obrigatório.", type: "error", isOpen: true})
            return
        }

        if(nomeContaInput.length < 2) {
            setPropsInfoPopup({msg: "Nome da conta deve ter pelo menos 2 letras.", type: "error", isOpen: true})
            return
        }

        if(nomeContaInput.length > 50) {
            setPropsInfoPopup({msg: "Nome da conta deve ter no máximo 50 letras.", type: "error", isOpen: true})
            return
        }

        if(!saldoIncialInput) {
            setPropsInfoPopup({msg: "Saldo inicial é obrigatório.", type: "error", isOpen: true})
            return
        }
        
        valorSerSalvo = converterMoedaBRParaNumero(saldoIncialInput);

        if(valorSerSalvo < 0) {
            setPropsInfoPopup({msg: "Saldo inicial não pode ser negativo", type: "error", isOpen: true})
            return
        }

    }

    function handleSalvarConta() {
        const valorSerSalvo = converterMoedaBRParaNumero(saldoIncialInput);
        validarCampos(valorSerSalvo)

        const requestSaveConta = {
            nome: nomeContaInput,
            tipoConta: Number(tipoContaEscolhido),
            saldoInicial: valorSerSalvo
        } 

        onSave(requestSaveConta)
    }

    return(
         <div className="modal">
                <div className="modal-header">
                    <h3 id="modal-conta-title">Editar Conta</h3>
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
                            <option value="1">Conta Corrente</option>
                            <option value="2">Poupança</option>
                            <option value="3">Carteira</option>
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
                    <button className="btn-primary" onClick={handleSalvarConta} >Salvar</button>
                </div>
            </div>
    )
}

export default ModalEditarConta