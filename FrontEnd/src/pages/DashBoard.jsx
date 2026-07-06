import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { apiHttpMethodHandler } from "../helpers/apiFetch" 

function DashBoard() {
    const API_PROFILE_URL = "http://localhost:5065/api/users/me"
    const navigate = useNavigate()
    const [userProfileData, setUserProfileData] = useState({})
    const { apiFetch } = apiHttpMethodHandler();
    const firstName = userProfileData?.nome?.split(" ")[0] ?? ""

    console.log("infos do usuário abaixo")
    console.log(userProfileData)

    useEffect(() => {
        carregarUsuario()
    }, [])

    async function carregarUsuario(params) {
        const response = await apiFetch("/users/me")

        if(!response) return;

        const data = await response.json();

        setUserProfileData(data)
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
            <h2 className="page-title">Dashboard</h2>
            <p className="page-sub" id="dash-greeting">Olá {firstName}! Aqui está o resumo das suas finanças.</p>
            </div>
            <div className="kpi-grid" id="kpi-grid">
            <div className="kpi-card kpi-receita">
                <div className="kpi-label">Total Receitas</div>
                <div className="kpi-value" id="kpi-receita">{formatarDinheiroVindoApi(userProfileData.totalReceitas)}</div>
                <div className="kpi-badge">↑ ENTRADA</div>
            </div>
            <div className="kpi-card kpi-despesa">
                <div className="kpi-label">Total Despesas</div>
                <div className="kpi-value" id="kpi-despesa">{formatarDinheiroVindoApi(userProfileData.totalDespesas)}</div>
                <div className="kpi-badge">↓ SAÍDA</div>
            </div>
            <div className="kpi-card kpi-saldo">
                <div className="kpi-label">Saldo Geral</div>
                <div className="kpi-value" id="kpi-saldo">{formatarDinheiroVindoApi(userProfileData.saldoTotal)}</div>
                <div className="kpi-badge">◈ LÍQUIDO</div>
            </div>
            <div className="kpi-card kpi-contas">
                <div className="kpi-label">Contas Ativas</div>
                <div className="kpi-value" id="kpi-contas">{userProfileData?.contas?.length}</div>
                <div className="kpi-badge">▣ CONTAS</div>
            </div>
            </div>
            <div className="dash-grid">
                <div className="dash-card">
                    <div className="dash-card-title">Transações Recentes</div>
                    <div id="dash-recent" className="txn-list-mini">
                        {userProfileData?.transacoes?.length < 1 ?
                            <div className="empty-state" style={{padding: "24px 0"}}> 
                                Nenhuma transação
                            </div>
                        :
                           userProfileData?.transacoes?.map((transacao) => 
                                <div className="txn-mini-item">
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
                        {userProfileData?.contas?.length < 1 ?
                            <div className="empty-state" style={{padding: "24px 0"}}> 
                                Nenhuma conta
                            </div>
                        :
                            userProfileData?.contas?.map((conta) =>
                                <div className="conta-mini-item">
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