import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiHttpMethodHandler } from "../helpers/apiFetch" 

function DashBoard() {
    const API_PROFILE_URL = "http://localhost:5065/api/users/me"
    const navigate = useNavigate()
    const [userProfileData, setUserProfileData] = useState({})
    const { apiFetch } = apiHttpMethodHandler();
    const firstName = userProfileData?.nome?.split(" ")[0] ?? ""
    const isTransacoesEmpty = userProfileData?.transacoes?.length < 1
    const isContasEmpty = userProfileData?.contas?.length < 1

    useEffect(() => {
        carregarUsuario()
    }, [])

    async function carregarUsuario(params) {
        const response = await apiFetch("/users/me")

        if(!response) return;

        const data = await response.json();

        setUserProfileData(data)
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
                <div className="kpi-value" id="kpi-receita">R$ 0,00</div>
                <div className="kpi-badge">↑ ENTRADA</div>
            </div>
            <div className="kpi-card kpi-despesa">
                <div className="kpi-label">Total Despesas</div>
                <div className="kpi-value" id="kpi-despesa">R$ 0,00</div>
                <div className="kpi-badge">↓ SAÍDA</div>
            </div>
            <div className="kpi-card kpi-saldo">
                <div className="kpi-label">Saldo Geral</div>
                <div className="kpi-value" id="kpi-saldo">R$ 0,00</div>
                <div className="kpi-badge">◈ LÍQUIDO</div>
            </div>
            <div className="kpi-card kpi-contas">
                <div className="kpi-label">Contas Ativas</div>
                <div className="kpi-value" id="kpi-contas">0</div>
                <div className="kpi-badge">▣ CONTAS</div>
            </div>
            </div>
            <div className="dash-grid">
                <div className="dash-card">
                    <div className="dash-card-title">Transações Recentes</div>
                    <div id="dash-recent" className="txn-list-mini">
                        {isTransacoesEmpty ? 
                            <div className="empty-state" style={{padding: "24px 0"}}> 
                                Nenhuma transação
                            </div>
                        :
                            null
                        }
                    </div>
                </div>
                <div className="dash-card">
                    <div className="dash-card-title">Contas</div>
                    <div id="dash-contas" className="contas-mini">
                        {isContasEmpty ?
                            <div className="empty-state" style={{padding: "24px 0"}}> 
                                Nenhuma conta
                            </div>
                        :
                            null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashBoard