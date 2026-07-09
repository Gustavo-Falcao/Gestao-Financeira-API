import { useEffect, useState, useRef } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { apiHttpMethodHandler } from "../helpers/apiFetch" 

function DashBoard() {
    const { userProfileData } = useOutletContext();
    const navigate = useNavigate()
    const [dashboard, setDashboard] = useState({})
    const { apiFetch } = apiHttpMethodHandler();
    const firstName = userProfileData?.nome?.split(" ")[0] ?? ""
    console.log("User profile abaixo")
    console.log(userProfileData)
    useEffect(() => {
        carregarDashboard()
    }, [])

    async function carregarDashboard(params) {
        const response = await apiFetch("/users/me/dashboard")

        if(!response) return;

        const data = await response.json();

        setDashboard(data)
    }

    function formatarDinheiroVindoApi(valor) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number(valor));
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
                <div className="kpi-value" id="kpi-receita">{formatarDinheiroVindoApi(dashboard.totalReceitas)}</div>
                <div className="kpi-badge">↑ ENTRADA</div>
            </div>
            <div className="kpi-card kpi-despesa">
                <div className="kpi-label">Total Despesas</div>
                <div className="kpi-value" id="kpi-despesa">{formatarDinheiroVindoApi(dashboard.totalDespesas)}</div>
                <div className="kpi-badge">↓ SAÍDA</div>
            </div>
            <div className="kpi-card kpi-saldo">
                <div className="kpi-label">Saldo Geral</div>
                <div className="kpi-value" id="kpi-saldo">{formatarDinheiroVindoApi(dashboard.saldoTotal)}</div>
                <div className="kpi-badge">◈ LÍQUIDO</div>
            </div>
            <div className="kpi-card kpi-contas">
                <div className="kpi-label">Contas Ativas</div>
                <div className="kpi-value" id="kpi-contas">{dashboard?.contas?.length}</div>
                <div className="kpi-badge">▣ CONTAS</div>
            </div>
            </div>
            <div className="dash-grid">
                <div className="dash-card">
                    <div className="dash-card-title">Transações Recentes</div>
                    <div id="dash-recent" className="txn-list-mini">
                        {dashboard?.transacoes?.length < 1 ?
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
                                    <div className="txn-mini-date">{transacao.data}</div>
                                    <div className={`txn-mini-val ${transacao.tipoMovimentacao === "Receita" ? 'receita' : 'despesa'}`}>{transacao.tipoMovimentacao === 'Receita' ? '+' : '-' }{formatarDinheiroVindoApi(transacao.valor)}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="dash-card">
                    <div className="dash-card-title">Contas</div>
                    <div id="dash-contas" className="contas-mini">
                        {dashboard?.contas?.length < 1 ?
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
                                    <div className="conta-mini-saldo">{formatarDinheiroVindoApi(conta.saldoInicial)}</div>
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