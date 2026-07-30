import { useEffect, useRef, useState } from "react"
import { apiHttpMethodHandler } from "../helpers/apiFetch"
import BackGroundModal from "../components/BackGroundModal.jsx";
import ModalConta from "../components/ModalConta.jsx";
import ModalDeletar from "../components/ModalDeletar.jsx";

function Contas({ setPropsInfoPopup }) {
    const { apiFetch } = apiHttpMethodHandler()
    const [contas, setContas] = useState([])
    const isContasEmpty = contas.length < 1;
    const [isBackGroundModalOpen, setIsBackGroundModalOpen] = useState(false)
    const [isContaModalOpen, setIsContaModalOpen] = useState(false)
    const [isDeletarContaModalOpen, setIsDeletarContaModalOpen] = useState(false)
    const contaSerEditada = useRef(null);
    const idContaSerDeletada = useRef(null);
    const modeModal = useRef(null)

    useEffect(() => {
        carregarContas()
    }, [])

    async function carregarContas() {
        const response = await apiFetch("/contas")

        if(!response) return

        const data = await response.json();

        setContas(data);
    }
    
    function openModalContaToCreate() {
        setIsBackGroundModalOpen(true)
        setIsContaModalOpen(true)   
        modeModal.current = "create"
    }
    
    function openModalContaToEdit() {
        setIsBackGroundModalOpen(true)
        setIsContaModalOpen(true)
        modeModal.current = "edit"
    }
    
    function fecharModalConta() {
        setIsBackGroundModalOpen(false)
        setIsContaModalOpen(false)
        modeModal.current = null
        contaSerEditada.current = null
    }

    function abrirModalDeletarConta() {
        setIsBackGroundModalOpen(true)
        setIsDeletarContaModalOpen(true)
    }

    function fecharModalDeletarConta() {
        setIsBackGroundModalOpen(false)
        setIsDeletarContaModalOpen(false)
    }
    

    async function excluirConta() {
        const idConta = idContaSerDeletada.current;
        const response = await apiFetch(`/contas/${idConta}`, {
            method: "DELETE"
        })

        if(response.status === 400) {
            const data = await response.json()
            setPropsInfoPopup({msg: data.message, type: "error", isOpen: true})
        }

        if(response.status === 404) {
            const data = await response.json()
            setPropsInfoPopup({msg: data.message, type: "error", isOpen: true})
        }

        if(response.status === 200) {
            setPropsInfoPopup({msg: "Conta excluida com sucesso!", type: "success", isOpen: true})
        }

        fecharModalDeletarConta()
        carregarContas()
    }

    async function criarConta(requestCreateConta) {
        console.log("conta sera criada")
        const response = await apiFetch("/contas", {
            method: "POST",
            body: JSON.stringify(requestCreateConta)
        });

        if(!response) return
        
        if(response.status === 400) {
            const data = await response.json()
            setPropsInfoPopup({msg: data.message, type: "error", isOpen: true})
        }

        if(response.status === 201) {
            setPropsInfoPopup({msg: "Conta criada com sucesso!", type: "success", isOpen: true})
        }

        fecharModalConta()
        carregarContas()
    }

    async function editarConta(requestEditConta) {
        const contaId = contaSerEditada.current.id
        const response = await apiFetch(`/contas/${contaId}`, {
            method: "PATCH",
            body: JSON.stringify(requestEditConta)
        });

        if(!response) return

        if(response.status === 400) {
            const data = await response.json()
            setPropsInfoPopup({msg: data.message, type: "error", isOpen: true})
        }

        if(response.status === 404) {
            setPropsInfoPopup({msg: "Conta não encontrada!", type: "error", isOpen: true})
        }

        if(response.status === 200) {
            setPropsInfoPopup({msg: "Conta editada com sucesso!", type: "success", isOpen: true})
        }

        fecharModalConta()
        carregarContas()
    }

    function actionsConta(e) {
        const target = e.target

        const cardElement = target.closest('.conta-card')

        if(!cardElement) return

        const contaId = cardElement.dataset.id

        if(target.tagName === 'BUTTON') {
            const actionType = target.dataset.action
            if(actionType === "editar") {
                const contaEncontrada = contas.find(c => c.id === contaId) ?? null
                contaSerEditada.current = contaEncontrada
                openModalContaToEdit()
            } 
            
            if(actionType === "deletar") {
                idContaSerDeletada.current = contaId
                abrirModalDeletarConta()
            }
            
        }
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
            <button className="btn-primary" onClick={openModalContaToCreate}>+ Nova Conta</button>
            </div>
            <div className="cards-grid" id="contas-grid" onClick={actionsConta}>
                {isContasEmpty ?
                    <div className="empty-state">Nenhuma conta cadastrada ainda.</div>
                :
                    contas.map((conta) => 
                        <div className="conta-card" key={conta.id} data-id={conta.id}>
                            <div className="conta-card-glow"></div>
                            <div className="conta-card-tipo">
                               Conta {conta.tipoConta.toUpperCase()}
                            </div>
                            <div className="conta-card-nome">{conta.nome}</div>
                            <div className="conta-card-saldos">
                                <div className="conta-card-saldo-item">
                                    <div className="conta-card-saldo-item-label">Saldo inicial</div>
                                    <div className="conta-card-saldo-item-val inicial">
                                        {formatarDinheiroVindoApi(conta.saldoInicial)}
                                    </div>
                                </div>
                                <div className="conta-card-saldo-item">
                                    <div className="conta-card-saldo-item-label">Saldo atual</div>
                                    <div className="conta-card-saldo-item-val positivo">
                                        {formatarDinheiroVindoApi(conta.saldoAtual)}
                                    </div>
                                    <div className="conta-card-delta">
                                        <span className={`conta-card-delta-badge ${conta.movimentacao > 0 ? "positivo" : conta.movimentacao < 0 ? "negativo" : "neutro"}`}>
                                            {
                                                conta.movimentacao > 0 ?
                                                    `↑ ${formatarDinheiroVindoApi(conta.movimentacao)}`
                                                :
                                                conta.movimentacao < 0 ?
                                                    `↓ ${formatarDinheiroVindoApi(conta.movimentacao * -1)}`
                                                :
                                                    "= sem movimentação"
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="conta-card-actions">
                                <button 
                                className="btn-icon" 
                                data-action="editar">✏ Editar</button>
                                <button 
                                className="btn-icon danger" 
                                data-action="deletar">✕</button>
                            </div>
                        </div>
                    )
                }
            </div>
      </section>

      <BackGroundModal isOpen={isBackGroundModalOpen}>
        <ModalConta
        isOpen={isContaModalOpen} 
        onClose={fecharModalConta} 
        setPropsInfoPopup={setPropsInfoPopup}
        onSubmit={modeModal.current === "edit" ? editarConta : criarConta}
        modeModal={modeModal.current}
        contaEdit={contaSerEditada.current}
        />

        <ModalDeletar 
        isOpen={isDeletarContaModalOpen} 
        onCancelar={fecharModalDeletarConta} 
        onExcluir={excluirConta}
        nomeDeletar={"conta"}
        />
      </BackGroundModal>
      </>
    )
}

export default Contas