function Login() {

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
                <input type="email" id="login-email" placeholder="seu@email.com" />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <div className="input-wrap">
                <input type="password" id="login-senha" placeholder="••••••••" />
                <button className="eye-btn" onclick="togglePass('login-senha',this)">👁</button>
                </div>
            </div>
            <button className="btn-primary full" onclick="doLogin()">Entrar</button>
            <p className="auth-footer">Não tem conta? <a onclick="showPage('page-register')">Cadastre-se</a></p>
            </div>
        </div>
    )

}

export default Login