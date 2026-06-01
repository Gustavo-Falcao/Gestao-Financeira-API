import { useNavigate } from "react-router-dom"

function Cadastro() {

    const navigate = useNavigate();

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
            <div className="form-group">
                <label>Nome completo</label>
                <input type="text" id="reg-nome" placeholder="João Silva" />
            </div>
            <div className="form-group">
                <label>E-mail</label>
                <input type="email" id="reg-email" placeholder="seu@email.com" />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <div className="input-wrap">
                <input type="password" id="reg-senha" placeholder="Mínimo 8 caracteres" />
                <button className="eye-btn" onclick="togglePass('reg-senha',this)">👁</button>
                </div>
            </div>
            <div className="form-group">
                <label>Perfil</label>
                <select id="reg-role">
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
                </select>
            </div>
            <button className="btn-primary full" onclick="doRegister()">Criar conta</button>
            <p className="auth-footer">Já tem conta? <a onClick={() => navigate("/login")}>Entrar</a></p>
            </div>
        </div>
    )
}

export default Cadastro