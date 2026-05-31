import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiFetch } from "../services/api";

function NovaConta() {

  const navigate = useNavigate();

  const [nome, setNome] =
    useState("");

  const [saldoInicial,
    setSaldoInicial] =
    useState("");

  const [tipoConta,
    setTipoConta] =
    useState(0);

  async function salvar(e) {

    e.preventDefault();

    await apiFetch("/contas", {
      method: "POST",
      body: JSON.stringify({
        nome,
        saldoInicial:
          Number(saldoInicial),
        tipoConta,
        usuarioId:
          "ID_USUARIO"
      })
    });

    navigate("/contas");
  }

  return (
    <div className="dashboard-page">

      <Sidebar />

      <main className="dashboard-content">

        <h1>Nova Conta</h1>

        <form
          className="form-card"
          onSubmit={salvar}
        >

          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Saldo"
            value={saldoInicial}
            onChange={(e) =>
              setSaldoInicial(
                e.target.value
              )
            }
          />

          <select
            value={tipoConta}
            onChange={(e) =>
              setTipoConta(
                Number(e.target.value)
              )
            }
          >
            <option value="0">
              Corrente
            </option>

            <option value="1">
              Poupança
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

export default NovaConta;