import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiFetch } from "../services/api";

function NovaTransacao() {

  const navigate =
    useNavigate();

  const [descricao,
    setDescricao] =
    useState("");

  const [valor,
    setValor] =
    useState("");

  const [tipoMovimentacao,
    setTipoMovimentacao] =
    useState("Receita");

  async function salvar(e) {

    e.preventDefault();

    await apiFetch(
      "/transacoes",
      {
        method: "POST",

        body: JSON.stringify({
          descricao,
          valor:
            Number(valor),
          tipoMovimentacao,
          usuarioId:
            "ID_USUARIO",
          contaId:
            "ID_CONTA",
          categoriaId:
            "ID_CATEGORIA"
        })
      }
    );

    navigate("/transacoes");
  }

  return (
    <div className="dashboard-page">

      <Sidebar />

      <main className="dashboard-content">

        <h1>
          Nova Transação
        </h1>

        <form
          className="form-card"
          onSubmit={salvar}
        >

          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(e) =>
              setDescricao(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) =>
              setValor(
                e.target.value
              )
            }
          />

          <select
            value={
              tipoMovimentacao
            }
            onChange={(e) =>
              setTipoMovimentacao(
                e.target.value
              )
            }
          >
            <option>
              Receita
            </option>

            <option>
              Despesa
            </option>
          </select>

          <button
            type="submit"
            className="btn-primary"
          >
            Salvar
          </button>

        </form>

      </main>

    </div>
  );
}

export default NovaTransacao;