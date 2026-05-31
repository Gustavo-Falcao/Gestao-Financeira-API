import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Estados para controlar os inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  // Estado para alternar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5065/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        alert("Login inválido");
        return;
      }

      const data = await response.json();

      // 1. Verifique se o nome da propriedade vinda da API é exatamente "token"
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        
        // 2. Redireciona APÓS ter certeza que salvou
        navigate("/dashboard");
      } else {
        alert("Erro: O servidor não retornou um token válido.");
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <form onSubmit={handleLogin}>
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
            <label htmlFor="login-email">E-mail</label>
            <input 
              type="email" 
              id="login-email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="login-senha">Senha</label>
            <div className="input-wrap">
              <input 
                type={showPassword ? "text" : "password"} 
                id="login-senha" 
                placeholder="••••••••" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              {/* Botão de mostrar/esconder senha adaptado para React */}
              <button 
                type="button" 
                className="eye-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>
          </div>
          
          {/* Botão configurado como submit para disparar o onSubmit do form */}
          <button type="submit" className="btn-primary full">Entrar</button>
          
          {/* Substitua a função showPage por uma navegação do react-router se necessário */}
          <p className="auth-footer">
            Não tem conta? <span className="link-cadastro" onClick={() => navigate("/register")}>Cadastre-se</span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;