import { Link } from "react-router-dom";

function Sidebar() {

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <aside className="sidebar">

      <div className="auth-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-name">
          Finanza
        </span>
      </div>

      <nav>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/contas">
          Contas
        </Link>

        <Link to="/transacoes">
          Transações
        </Link>

      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Sair
      </button>

    </aside>
  );
}

export default Sidebar;