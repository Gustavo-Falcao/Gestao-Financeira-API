import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Se não encontrar o token exatamente com essa chave, expulsa para o login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se achou o token, deixa o usuário passar para o Dashboard
  return children;
}

export default ProtectedRoute;