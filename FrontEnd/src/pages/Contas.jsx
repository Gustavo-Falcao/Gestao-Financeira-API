import { useEffect, useRef, useState } from "react"
import { apiHttpMethodHandler } from "../helpers/apiFetch"
import BackGroundModal from "../components/BackGroundModal.jsx";
import ModalConta from "../components/ModalConta.jsx";
import ModalDeletarConta from "../components/ModalDeletarConta.jsx";
import ModalEditarConta from "../components/ModalEditarConta.jsx";

function Contas({ setPropsInfoPopup }) {
    const { apiFetch } = apiHttpMethodHandler()
    const [contas, setContas] = useState([])
    const isContasEmpty = contas.length < 1;
    const [isBackGroundModalOpen, setIsBackGroundModalOpen] = useState(false)
    const [isContaModalOpen, setIsContaModalOpen] = useState(false)
    const [isDeletarContaModalOpen, setIsDeletarContaModalOpen] = useState(false)
    const [isEditarContaModalOpen, setIsEditarContaModalOpen] = useState(false)
    const contaSerEditada = useRef({id: "", nome: "", saldoInicial: "", tipoConta: ""});

    useEffect(() => {
        carregarContas()
    }, [])

    async function carregarContas() {
        const response = await apiFetch("/contas/byUser")

        if(!response) return

        const data = await response.json();

        setContas(data);
    }

    function openModalConta() {
        setIsBackGroundModalOpen(true)
        setIsContaModalOpen(true)
    }

    function closeModalConta() {
        setIsBackGroundModalOpen(false)
        setIsContaModalOpen(false)
    }

    function abrirModalDeletarConta() {
        setIsBackGroundModalOpen(true)
        setIsDeletarContaModalOpen(true)
    }

    function fecharModalDeletarConta() {
        setIsBackGroundModalOpen(false)
        setIsDeletarContaModalOpen(false)
    }

    function abrirModalEditarConta() {
        setIsBackGroundModalOpen(true)
        setIsEditarContaModalOpen(true)
    }

    function fecharModalEditarConta() {
        setIsBackGroundModalOpen(false)
        setIsEditarContaModalOpen(false)
    }
    

    async function excluirConta() {
        const idConta = contaSerEditada.current.id;
        const response = await apiFetch(`/contas/${idConta}`, {
            method: "DELETE"
        })

        setPropsInfoPopup({msg: "Conta deletada com sucesso", type: "success", isOpen: true})

        fecharModalDeletarConta()
        carregarContas()
    }

    async function criarConta(requestCreateConta) {
        const response = await apiFetch("/contas", {
            method: "POST",
            body: JSON.stringify(requestCreateConta)
        });

        if(!response) return

        setPropsInfoPopup({msg: "Conta criada com sucesso", type: "success", isOpen: true})

        closeModalConta()
        carregarContas()
    }

    async function editarConta(requestEditConta) {
        const contaId = contaSerEditada.current.id
        const response = await apiFetch(`/contas/${contaId}`, {
            method: "PUT",
            body: JSON.stringify(requestEditConta)
        });

        if(!response) return

        setPropsInfoPopup({msg: "Conta alterada com sucesso", type: "success", isOpen: true})

        contaSerEditada.current = {id: "", nome: "", saldoInicial: "", tipoConta: ""}
        fecharModalEditarConta()
        carregarContas()
    }

    function formatarDinheiroVindoApi(valor) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number(valor));
    }

    return (
        <>
        <section id="tab-contas" className="tab active">
            <div className="page-header">
            <div>
                <h2 className="page-title">Contas</h2>
                <p className="page-sub">Gerencie suas contas bancárias e carteiras</p>
            </div>
            <button className="btn-primary" onClick={openModalConta}>+ Nova Conta</button>
            </div>
            <div className="cards-grid" id="contas-grid">
                {isContasEmpty ?
                    <div className="empty-state">Nenhuma conta cadastrada ainda.</div>
                :
                    contas.map((conta) => 
                        <div className="conta-card" key={conta.id}>
                            <div className="conta-card-glow"></div>
                            <div className="conta-card-tipo">
                               Conta {conta.tipoConta.toUpperCase()}
                            </div>
                            <div className="conta-card-nome">{conta.nome}</div>
                            {/* <div className="conta-card-saldo-label">Saldo inicial</div>
                            <div className="conta-card-saldo">{formatarDinheiroVindoApi(conta.saldoInicial)}</div> */}
                            <div className="conta-card-saldos">
                                <div className="conta-card-saldo-item">
                                    <div className="conta-card-saldo-item-label">Saldo inicial</div>
                                    <div className="conta-card-saldo-item-val inicial">saldo inicial</div>
                                </div>
                                <div className="conta-card-saldo-item">
                                    <div className="conta-card-saldo-item-label">Saldo atual</div>
                                    <div className="conta-card-saldo-item-val ${saldoAtualClass}">saldo atual valor</div>
                                    <div className="conta-card-delta">
                                        <span className="conta-card-delta-badge ${deltaClass}">quanto movimentou na conta</span>
                                    </div>
                                </div>
                            </div>
                            <div className="conta-card-actions">
                                <button className="btn-icon" onClick={() => {
                                    contaSerEditada.current = {
                                        id: conta.id,
                                        nome: conta.nome,
                                        saldoInicial: conta.saldoInicial,
                                        tipoConta: conta.tipoConta
                                    }

                                    abrirModalEditarConta()
                                }}>✏ Editar</button>
                                <button className="btn-icon danger" onClick={() => {
                                    contaSerEditada.current.id = conta.id
                                    abrirModalDeletarConta()
                                }}>✕</button>
                            </div>
                        </div>
                    )
                }
            </div>
      </section>

      <BackGroundModal isOpen={isBackGroundModalOpen}>
        <ModalConta 
        isOpen={isContaModalOpen} 
        onClose={closeModalConta} 
        setPropsInfoPopup={setPropsInfoPopup}
        onCreate={criarConta}
        />

        <ModalDeletarConta isOpen={isDeletarContaModalOpen} onCancelar={fecharModalDeletarConta} onExcluir={excluirConta}/>

        <ModalEditarConta isOpen={isEditarContaModalOpen} nomeConta={contaSerEditada.current.nome} saldoInicial={contaSerEditada.current.saldoInicial} tipoConta={contaSerEditada.current.tipoConta} onClose={fecharModalEditarConta} onSave={editarConta}/>
      </BackGroundModal>
      </>
    )
}

export default Contas