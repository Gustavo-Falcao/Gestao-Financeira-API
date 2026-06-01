import { useEffect, useState } from "react"
import BackGroundModal from "../components/BackGroundModal.jsx";
import ModalTransacao from "../components/ModalTransacao.jsx";
import { apiHttpMethodHandler } from "../helpers/apiFetch.js";


function Transacoes({setPropsInfoPopup}) {
    const { apiFetch } = apiHttpMethodHandler();
    const [transacoes, setTransacoes] = useState([])
    const [isBackGroundModalOpen, setIsBackGroundModalOpen] = useState(false)
    const [isModalTransacaoOpen, setIsModalTransacaoOpen] = useState(false)
    const isTransacoesEmpty = transacoes.length < 1;

    useEffect(() => {
        carregarTransacoes()
    }, [])

    async function carregarTransacoes() {
        const response = await apiFetch("/transacoes/byUser")

        if(!response) return

        const data = await response.json();

        setTransacoes(data);
    }

    function fecharModalTransacao() {
        setIsModalTransacaoOpen(false)
        setIsBackGroundModalOpen(false)
    }

    function abriModalTransacao() {
        setIsModalTransacaoOpen(true)
        setIsBackGroundModalOpen(true)
    }

    async function criarTransacao(requestCreateTransacao) {
        const response = await apiFetch("/transacoes", {
            method: "POST",
            body: JSON.stringify(requestCreateTransacao)
        });

        if(!response) return

        setPropsInfoPopup({msg: "Transação criada com sucesso", type: "success", isOpen: true})

        fecharModalTransacao()
        carregarTransacoes();
    }

    function formatarDinheiro(valor) {
        const valorNumerico = Number(valor) / 100

        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valorNumerico)

        return valorFormatado
    }

    return (

        <>
        <section id="tab-transacoes" className="tab active">
            <div className="page-header">
            <div>
                <h2 className="page-title">Transações</h2>
                <p className="page-sub">Registre e acompanhe suas movimentações</p>
            </div>
            <button className="btn-primary" onClick={abriModalTransacao}>+ Nova Transação</button>
            </div>
            <div className="filter-bar">
            <select id="filter-tipo" >
                <option value="">Todos os tipos</option>
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
            </select>
            <select id="filter-conta" >
                <option value="">Todas as contas</option>
            </select>
            <input type="month" id="filter-mes"/>
            </div>
            <div className="txn-table-wrap">
            <table className="txn-table">
                <thead>
                <tr><th>Descrição</th><th>Tipo</th><th>Categoria</th><th>Conta</th><th>Data</th><th>Valor</th><th></th></tr>
                </thead>
                <tbody id="txn-tbody">
                    {isTransacoesEmpty ?
                        <tr><td colSpan="7" className="empty-row">Nenhuma transação encontrada.</td></tr>
                    :

                    transacoes.map((transacao) => 
                        <tr>
                            <td>{transacao.descricao}</td>
                            <td><span className="badge badge-${cl}">{transacao.tipoMovimentacao}</span></td>
                            <td>{transacao.categoriaId}</td>
                            <td>{transacao.contaId}</td>
                            <td>{transacao.data}</td>
                            <td><span class={`txn-val ${transacao.tipoMovimentacao === "Receita" ? 'receita' : 'despesa'}`}>{transacao.tipoMovimentacao === "Receita" ? '+' : '-' } {formatarDinheiro(transacao.valor)}</span></td>
                            <td>
                                <div className="txn-actions">
                                <button className="btn-icon" onclick="editTransacao(${t.id})">✏</button>
                                <button className="btn-icon danger" onclick="confirmDelete('transacao',${t.id})">✕</button>
                                </div>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            </div>
        </section>

        <BackGroundModal isOpen={isBackGroundModalOpen}>
            <ModalTransacao isOpen={isModalTransacaoOpen} onClose={fecharModalTransacao} onCreate={criarTransacao} setPropsInfoPopup={setPropsInfoPopup}/>
        </BackGroundModal>
        </>
    )
}

export default Transacoes