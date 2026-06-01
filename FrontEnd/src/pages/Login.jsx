import { useState } from "react";
import { replace, useNavigate } from "react-router-dom"

function Login({setPropsInfoPopup}) {
    const API_AUTH_URL = "http://localhost:5065/api/auth/login"
    const navigate = useNavigate();

    const [isMostrarSenha, setIsMostrarSenha] = useState(false)
    const [emailInput, setEmailInput] = useState("")
    const [senhaInput, setSenhaInput] = useState("")

    async function autenticarUsuario() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,50}$/

        if(!emailRegex.test(emailInput)) {
            setPropsInfoPopup({
                msg: "Formato de E-mail inválido.",
                type: "error",
                isOpen: true
            })
            return
        }

        if(!senhaRegex.test(senhaInput)) {
            setPropsInfoPopup({
                msg: "Formato de senha inválido.",
                type: "error",
                isOpen: true
            })
            return
        }

        const requestLogin = {
            email: emailInput.trim(),
            senha: senhaInput.trim()
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

        setPropsInfoPopup({
            msg: "Login realizado com sucesso!",
            type: "success",
            isOpen: true
        })

        navigate("/", {replace: true})
        
    }

    return (
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
    )

}

export default Login