import { useState } from "react";
import { replace, useNavigate } from "react-router-dom"
import InfoPopup from "../components/InfoPopup.jsx";

function Login() {
    const API_AUTH_URL = "http://localhost:5065/api/auth/login"
    const navigate = useNavigate();

    const [isMostrarSenha, setIsMostrarSenha] = useState(false)
    const [emailInput, setEmailInput] = useState("")
    const [senhaInput, setSenhaInput] = useState("")
    const [propsInfoPopup, setPropsInfoPopup] = useState({
        msg: "",
        type: "",
        isOpen: false
    })

    async function autenticarUsuario() {
        const requestLogin = {
            email: emailInput,
            senha: senhaInput
        }

        const responseLogin = await fetch(`${API_AUTH_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestLogin),
        })

        if(responseLogin.status === 401) {
            setPropsInfoPopup({
                msg: "E-mail ou senha inválidos.",
                type: "error",
                isOpen: true
            })
            return
        }

        const data = await responseLogin.json();

        const token = data.token

        localStorage.setItem("token", token)

        navigate("/", {replace: true})
        setPropsInfoPopup({
            msg: "Login realizado com sucesso!",
            type: "success",
            isOpen: true
        })
    }

    return (
        <>
        <div id="page-login" className="auth-page active">
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
            <h1 className="auth-title">Bem-vindo de volta</h1>
            <p className="auth-sub">Acesse sua conta para continuar</p>
            <div className="form-group">
                <label>E-mail</label>
                <input 
                type="email" 
                id="login-email" 
                placeholder="seu@email.com"
                onChange={(e) => setEmailInput(e.target.value)} 
                value={emailInput}
                />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <div className="input-wrap">
                <input 
                type={isMostrarSenha ? "text" : "password"} 
                id="login-senha" 
                placeholder="••••••••" 
                onChange={(e) => setSenhaInput(e.target.value)}
                value={senhaInput}
                />
                <button className="eye-btn" onClick={() => setIsMostrarSenha((prevIsMostrarSenha) => !prevIsMostrarSenha)}>
                    {isMostrarSenha ? "🙈" : "👁"} 
                </button>
                </div>
            </div>
            <button 
            className="btn-primary full"
            onClick={() => autenticarUsuario()}
            >Entrar</button>
            <p className="auth-footer">Não tem conta? <a onClick={() => navigate("/cadastro")}>Cadastre-se</a></p>
            </div>
        </div>

        <InfoPopup msg={propsInfoPopup.msg} type={propsInfoPopup.type} isOpen={propsInfoPopup.isOpen} onClose={() => setPropsInfoPopup({msg: "", type: "", isOpen: false})}/>
        </>
    )

}

export default Login