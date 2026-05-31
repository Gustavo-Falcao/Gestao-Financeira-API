import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiFetch } from "../services/api";

function Transacoes() {

  const [transacoes,
    setTransacoes] =
    useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {

    const response =
      await apiFetch(
        "/transacoes"
      );

    const data =
      await response.json();

    setTransacoes(data);
  }

  async function excluir(id) {

    await apiFetch(
      `/transacoes/${id}`,
      {
        method: "DELETE"
      }
    );

    carregar();
  }

  return (
    <div className="dashboard-page">

      <Sidebar />

      <main className="dashboard-content">

        <div className="page-header">

          <h1>Transações</h1>

          <Link
            to="/transacoes/nova"
            className="btn-primary"
          >
            Nova Transação
          </Link>

        </div>

        <div className="list-container">

          {transacoes.map(t => (

            <div
              key={t.id}
              className="list-card"
            >

              <div>

                <h3>
                  {t.descricao}
                </h3>

                <p>
                  {new Date(
                    t.data
                  ).toLocaleDateString()}
                </p>

              </div>

              <div>

                <span
                  className={
                    t.tipoMovimentacao ===
                    "Receita"
                      ? "income"
                      : "expense"
                  }
                >
                  R$ {t.valor}
                </span>

              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  excluir(t.id)
                }
              >
                Excluir
              </button>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Transacoes;