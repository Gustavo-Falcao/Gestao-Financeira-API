import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiFetch } from "../services/api";

function Contas() {

  const [contas, setContas] = useState([]);

  useEffect(() => {
    carregarContas();
  }, []);

  async function carregarContas() {
    try {

      const response =
        await apiFetch("/contas");

      const data =
        await response.json();

      setContas(data);

    } catch (error) {
      console.error(error);
    }
  }

  async function excluirConta(id) {

    if (!confirm("Deseja remover esta conta?"))
      return;

    await apiFetch(`/contas/${id}`, {
      method: "DELETE"
    });

    carregarContas();
  }

  return (
    <div className="dashboard-page">

      <Sidebar />

      <main className="dashboard-content">

        <div className="page-header">

          <h1>Contas</h1>

          <Link
            to="/contas/nova"
            className="btn-primary"
          >
            Nova Conta
          </Link>

        </div>

        <div className="list-container">

          {contas.map(conta => (

            <div
              key={conta.id}
              className="list-card"
            >

              <div>

                <h3>{conta.nome}</h3>

                <p>
                  Tipo: {conta.tipoConta}
                </p>

                <strong>
                  R$ {conta.saldoInicial}
                </strong>

              </div>

              <div className="actions">

                <Link
                  to={`/contas/${conta.id}`}
                  className="edit-btn"
                >
                  Editar
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    excluirConta(conta.id)
                  }
                >
                  Excluir
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Contas;