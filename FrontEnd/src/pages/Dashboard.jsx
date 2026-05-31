import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="auth-bg">
        <div className="auth-orb orb1"></div>
        <div className="auth-orb orb2"></div>
        <div className="auth-orb orb3"></div>
      </div>

      <Sidebar />

      <main className="dashboard-content">

        <h1>Dashboard</h1>

        <div className="cards">

          <div className="card">
            <h3>Saldo Total</h3>
            <span>R$ 15.320,00</span>
          </div>

          <div className="card">
            <h3>Receitas</h3>
            <span>R$ 5.000,00</span>
          </div>

          <div className="card">
            <h3>Despesas</h3>
            <span>R$ 2.000,00</span>
          </div>

        </div>

        <div className="transactions-panel">

          <h2>Últimas Transações</h2>

          <div className="transaction-item">
            <span>Salário</span>
            <span className="income">
              + R$ 5.000
            </span>
          </div>

          <div className="transaction-item">
            <span>Mercado</span>
            <span className="expense">
              - R$ 300
            </span>
          </div>

          <div className="transaction-item">
            <span>Netflix</span>
            <span className="expense">
              - R$ 40
            </span>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;