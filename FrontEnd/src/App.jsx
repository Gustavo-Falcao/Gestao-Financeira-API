import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contas from "./pages/Contas";
import NovaConta from "./pages/NovaConta";
import EditarConta from "./pages/EditarConta";
import Transacoes from "./pages/Transacoes";
import NovaTransacao from "./pages/NovaTransacao";
import ProtectedRoute from "./components/PrivateRoute";

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
            <Dashboard />
        }
      />

      <Route
        path="/contas"
        element={
            <Contas />
        }
      />

      <Route
        path="/contas/nova"
        element={
            <NovaConta />
        }
      />

      <Route
        path="/contas/:id"
        element={
            <EditarConta />
        }
      />

      <Route
        path="/transacoes"
        element={
            <Transacoes />
        }
      />

      <Route
        path="/transacoes/nova"
        element={
            <NovaTransacao />
        }
      />

    </Routes>
  );
}

export default App;