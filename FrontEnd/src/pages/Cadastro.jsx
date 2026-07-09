import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Cadastro({setPropsInfoPopup}) {
    const API_URL = "http://localhost:5065/api/users"
    const navigate = useNavigate();
    const [isMostrarSenha, setIsMostrarSenha] = useState(false)
    const [nomeInptuCreate, setNomeInptuCreate] = useState("")
    const [emailInputCreate, setEmailInputCreate] = useState("")
    const [senhaInputCreate, setSenhaInputCreate] = useState("")

    function validarCampos() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,50}$/

        if(!nomeInptuCreate || nomeInptuCreate.length < 3 || nomeInptuCreate.length > 100) {
            setPropsInfoPopup({
                msg: "Nome deve ter entre 3 a 100 caracteres.",
                type: "error",
                isOpen: true
            });
            return
        }

        if(!emailRegex.test(emailInputCreate)) {
            setPropsInfoPopup({
            msg: "Formato de E-mail inválido",
            type: "error",
            isOpen: true
            });
            return
        }

        if(!senhaRegex.test(senhaInputCreate)) {
            setPropsInfoPopup({
            msg: "Formato de senha inválida",
            type: "error",
            isOpen: true
            });
            return
        }
    }

    async function cadastrarUsuario() {
        validarCampos()

        const createUserRequest = {
            nome: nomeInptuCreate.trim(),
            email: emailInputCreate.trim(),
            senha: senhaInputCreate.trim()
        }

        const responseCreate = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createUserRequest),
        })

        if(responseCreate.status === 409) {
            console.log(responseCreate)
            setPropsInfoPopup({
                msg: "O E-mail informado já está cadastrado.",
                type: "error",
                isOpen: true
            });
            return
        }

        setPropsInfoPopup({
                msg: "Conta criada com sucesso.",
                type: "success",
                isOpen: true
            });

        navigate("/login", {replace: true})
    }

    return(
          <div id="page-register" className="auth-page active">
            <div className="auth-bg">
            <div className="auth-orb orb1"></div>
            <div className="auth-orb orb2"></div>
            <div className="auth-orb orb3"></div>
            </div>
            <div className="auth-card">
            <div className="auth-brand">
                <span className="brand-icon">◈</span>
                <span className="brand-name">Finanza</span>
            </div>
            <h1 className="auth-title">Criar conta</h1>
            <p className="auth-sub">Comece a controlar suas finanças hoje</p>
            <form action="">

                <div className="form-group">
                    <label>Nome completo</label>
                    <input 
                    type="text" 
                    id="reg-nome" 
                    placeholder="João Silva"
                    value={nomeInptuCreate}
                    onChange={(e) => setNomeInptuCreate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>E-mail</label>
                    <input 
                    type="email" 
                    id="reg-email" 
                    placeholder="seu@email.com" 
                    value={emailInputCreate}
                    onChange={(e) => setEmailInputCreate(e.target.value)}
                    autoComplete="username"
                    />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <div className="input-wrap">
                    <input 
                    type={isMostrarSenha ? "text" : "password"} 
                    id="reg-senha" 
                    placeholder="Min: 8 caracteres, 1 maiúscula e 1 número." 
                    value={senhaInputCreate}
                    onChange={(e) => setSenhaInputCreate(e.target.value)}
                    autoComplete="new-password"
                    />
                    <button 
                    className="eye-btn" 
                    onClick={() => setIsMostrarSenha((prevIsMostrarSenha) => !prevIsMostrarSenha)}
                    >
                        {isMostrarSenha ? "🙈" : "👁"}
                    </button>
                    </div>
                </div>
            </form>
            <button 
            className="btn-primary full"
            onClick={cadastrarUsuario}
            >Criar conta</button>
            <p className="auth-footer">Já tem conta? <a onClick={() => navigate("/login")}>Entrar</a></p>
            </div>
        </div>
    )
}

export default Cadastro