import { useEffect, useState, useRef } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { apiHttpMethodHandler } from "../helpers/apiFetch" 

function DashBoard() {
    const { userProfileData } = useOutletContext();
    const navigate = useNavigate()
    const [dashboard, setDashboard] = useState({})
    const { apiFetch } = apiHttpMethodHandler();
    const firstName = userProfileData?.nome?.split(" ")[0] ?? ""
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        carregarDashboard()
    }, [])

    async function carregarDashboard(params) {
        const response = await apiFetch("/users/me/dashboard")

        if(!response) return;

        const data = await response.json();

        setDashboard(data)
        setIsLoading(false)
    }

    function formatarDinheiroVindoApi(valor) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number(valor));
    }

    function formatarData(data) {
        const dataSeparada = data.split("-")
        const ano = dataSeparada[0]
        const mes = dataSeparada[1]
        const dia = dataSeparada[2]

        return `${dia}/${mes}/${ano}`
    }

    function calcularDiferencaEmPorcentagem(valorDiferenca, valorInicial) {
        const valorPercentual = (valorDiferenca / valorInicial) * 100
        return new Intl.NumberFormat('pt-BR', {
            maximumFractionDigits: 2
        }).format(valorPercentual)
    }

    return (
        <section id="tab-dashboard" className="tab active">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Dashboard</h2>
                    <p className="page-sub" id="dash-greeting">
                        Aqui está o resumo das suas finanças!
                    </p>
                </div>
            </div>
            <div className="kpi-grid" id="kpi-grid">
            <div className="kpi-card kpi-receita">
                <div className="kpi-label">Total Receitas</div>
                <div 
                className={`kpi-value ${isLoading && "skeleton skeleton-xl"}`} 
                id="kpi-receita"
                >
                    {formatarDinheiroVindoApi(dashboard.totalReceitas)}
                </div>
                <div className="kpi-badge">↑ ENTRADA</div>
            </div>
            <div className="kpi-card kpi-despesa">
                <div className="kpi-label">Total Despesas</div>
                <div 
                className={`kpi-value ${isLoading && "skeleton skeleton-xl"}`} 
                id="kpi-despesa"
                >
                    {formatarDinheiroVindoApi(dashboard.totalDespesas)}
                </div>
                <div className="kpi-badge">↓ SAÍDA</div>
            </div>
            <div className="kpi-card kpi-saldo">
                <div className="kpi-label">Saldo Geral</div>
                <div 
                className={`kpi-value ${isLoading && "skeleton skeleton-xl"}`}
                id="kpi-saldo"
                 >
                    {formatarDinheiroVindoApi(dashboard.saldoTotal)}
                </div>
                <div className="kpi-badge">◈ LÍQUIDO</div>
            </div>
            <div className="kpi-card kpi-contas">
                <div className="kpi-label">Contas Ativas</div>
                <div 
                className={`kpi-value ${isLoading && "skeleton skeleton-xl"}`} 
                id="kpi-contas"
                >
                    {dashboard?.contas?.length}
                </div>
                <div className="kpi-badge">▣ CONTAS</div>
            </div>
            </div>
            <div className="dash-grid">
                <div className="dash-card">
                    <div className="dash-card-title">Transações Recentes</div>
                    <div id="dash-recent" className="txn-list-mini">
                        {
                            isLoading ?
                                <div className="loading-block">
                                    <div className="loading-block-spinner"></div>
                                    <span className="loading-block-text">Carregando dados</span>
                                    <div className="loading-block-bar"></div>
                                </div>
                            :
                            dashboard?.transacoes?.length < 1 ?
                                <div className="empty-state" style={{padding: "24px 0"}}> 
                                    Nenhuma transação
                                </div>
                            :
                            dashboard?.transacoes?.map((transacao) => 
                                <div 
                                className="txn-mini-item"
                                key={transacao.id}
                                >
                                    <div className={`txn-mini-dot ${transacao.tipoMovimentacao === "Receita" ? 'receita' : 'despesa'}`} ></div>
                                    <div className="txn-mini-desc">{transacao.descricao}</div>
                                    <div className="txn-mini-date">{formatarData(transacao.data)}</div>
                                    <div className={`txn-mini-val ${transacao.tipoMovimentacao === "Receita" ? 'receita' : 'despesa'}`}>{transacao.tipoMovimentacao === 'Receita' ? '+' : '-' }{formatarDinheiroVindoApi(transacao.valor)}</div>
                                </div>
                            )
                        }    
                    </div>
                </div>
                <div className="dash-card">
                    <div className="dash-card-title">Contas</div>
                    <div id="dash-contas" className="contas-mini">
                        {
                            isLoading ?
                                <div className="loading-block">
                                    <div className="loading-block-spinner"></div>
                                    <span className="loading-block-text">Carregando dados</span>
                                    <div className="loading-block-bar"></div>
                                </div> 
                            :
                            dashboard?.contas?.length < 1 ?
                                <div className="empty-state" style={{padding: "24px 0"}}> 
                                    Nenhuma conta
                                </div>
                            :
                            dashboard?.contas?.map((conta) =>
                                <div 
                                className="conta-mini-item"
                                key={conta.id}
                                >
                                    <div>
                                        <div className="conta-mini-nome">{conta.nome}</div>
                                        <div className="conta-mini-tipo">{conta.tipoConta}</div>
                                    </div>
                                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>   
                                        <span className={`conta-card-delta-badge ${conta.movimentacao > 0 ? "positivo" : conta.movimentacao < 0 ? "negativo" : "neutro"}`}>
                                            {
                                                conta.movimentacao > 0 ?
                                                    `↑ ${calcularDiferencaEmPorcentagem(conta.movimentacao, conta.saldoInicial)} %`
                                                :
                                                conta.movimentacao < 0 ?
                                                    `↓ ${calcularDiferencaEmPorcentagem(conta.movimentacao * -1, conta.saldoInicial)} %`
                                                :
                                                    "= sem movimentação"
                                            }
                                        </span>          
                                        <div className="conta-mini-saldo">
                                            {formatarDinheiroVindoApi(conta.saldoAtual)}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashBoard