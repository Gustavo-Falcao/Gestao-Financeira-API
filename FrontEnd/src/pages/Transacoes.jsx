import { use, useEffect, useState } from "react"
import BackGroundModal from "../components/BackGroundModal.jsx";
import ModalTransacao from "../components/ModalTransacao.jsx";
import { apiHttpMethodHandler } from "../helpers/apiFetch.js";
import { data } from "react-router-dom";


function Transacoes({setPropsInfoPopup}) {
    const { apiFetch } = apiHttpMethodHandler();
    const [transacoes, setTransacoes] = useState([])
    const [isBackGroundModalOpen, setIsBackGroundModalOpen] = useState(false)
    const [isModalTransacaoOpen, setIsModalTransacaoOpen] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [contas, setContas] = useState([])
    const [isTransacoesLoading, setIsTransacoesLoading] = useState(true)
    const [isContasLoading, setIsContasLoading] = useState(true)
    const [tipoTransacaoParaFiltrar, setTipoTransacaoParaFiltrar] = useState("")
    const [idContaEscolhidaParaFiltar, setIdContaEscolhidaParaFiltar] = useState("")
    const [dataMesFiltro, setDataMesFiltro] = useState("")
    const transacoesFiltradas = getTransacoesFiltradas()
    const isTransacoesEmpty = transacoesFiltradas.length === 0;

    useEffect(() => {
        carregarTransacoes()
        carregarContas()
        carregarCategorias()
    }, [])

    function getTransacoesFiltradas() {
        return transacoes.filter((transacao) => {
            const filterByTipo = tipoTransacaoParaFiltrar === "" || tipoTransacaoParaFiltrar === transacao.tipoMovimentacao

            const filterByConta = idContaEscolhidaParaFiltar === "" || idContaEscolhidaParaFiltar === transacao.contaId

            const filterByDataMes = dataMesFiltro === "" || transacao.data.startsWith(dataMesFiltro)

            return filterByTipo && filterByConta && filterByDataMes
        })
    }

    function findNomeCategoria(idCategoria) {
        const categoria = categorias.find(categoria => categoria.id === idCategoria);

        if(!categoria) return idCategoria

        return categoria.nome;
    }

    function findNomeConta(idConta) {
        const conta = contas.find(conta => conta.id === idConta);

        if(!conta) return idConta

        return conta.nome;
    }

    async function carregarTransacoes() {
        const response = await apiFetch("/transacoes/byUser")

        if(!response) return

        const data = await response.json();

        setTransacoes(data);
        setIsTransacoesLoading(false)
    }

    async function carregarContas() {
        const response = await apiFetch("/contas/byUser")

        if(!response) return

        const data = await response.json();

        setContas(data);
        setIsContasLoading(false)
    }

    async function carregarCategorias() {
        const response = await apiFetch("/categorias/byUser")
        
        if(!response) return

        const data = await response.json();

        setCategorias(data);
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

    function formatarDinheiroVindoApi(valor) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number(valor));
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
            <select 
            id="filter-tipo" 
            onChange={(e) => setTipoTransacaoParaFiltrar(e.target.value)}
            >
                <option value="">Todos os tipos</option>
                <option value="Receita">Receita</option>
                <option value="Despesa">Despesa</option>
            </select>
            {
                isContasLoading ?
                    <span className="skeleton skeleton-lg"></span>
                :
                <select 
                id="filter-conta"
                onChange={(e) => setIdContaEscolhidaParaFiltar(e.target.value)}
                >
                    <option value="">Todas as contas</option>
                    {
                        contas.length > 0 &&
                            contas.map((conta) => (
                                <option key={conta.id} value={conta.id}>{conta.nome}</option>
                            ))
                    }
                </select>
            }
            <input 
            type="month" 
            value={dataMesFiltro}
            id="filter-mes"
            onChange={(e) => setDataMesFiltro(e.target.value)}
            />
            <button 
            className="btn-primary"
            onClick={() => setDataMesFiltro("")}
            >Todos os mesês</button>
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

                    transacoesFiltradas.map((transacao) => 
                        <tr key={transacao.id}>
                            <td>{transacao.descricao}</td>
                            <td><span className={`badge badge-${transacao.tipoMovimentacao === 'Receita' ? 'receita' : 'despesa'}`}>{transacao.tipoMovimentacao}</span></td>
                            <td>{findNomeCategoria(transacao.categoriaId)}</td>
                            <td>{findNomeConta(transacao.contaId)}</td>
                            <td>{transacao.data}</td>
                            <td><span className={`txn-val ${transacao.tipoMovimentacao === "Receita" ? 'receita' : 'despesa'}`}>{transacao.tipoMovimentacao === "Receita" ? '+' : '-' } {formatarDinheiroVindoApi(transacao.valor)}</span></td>
                            <td>
                                <div className="txn-actions">
                                <button className="btn-icon">✏</button>
                                <button className="btn-icon danger">✕</button>
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
            <ModalTransacao isOpen={isModalTransacaoOpen} onClose={fecharModalTransacao} onCreate={criarTransacao} setPropsInfoPopup={setPropsInfoPopup} categorias={categorias} contas={contas}/>
        </BackGroundModal>
        </>
    )
}

export default Transacoes