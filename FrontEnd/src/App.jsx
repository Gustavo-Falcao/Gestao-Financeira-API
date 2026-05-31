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
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contas"
        element={
          <ProtectedRoute>
            <Contas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contas/nova"
        element={
          <ProtectedRoute>
            <NovaConta />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contas/:id"
        element={
          <ProtectedRoute>
            <EditarConta />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transacoes"
        element={
          <ProtectedRoute>
            <Transacoes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transacoes/nova"
        element={
          <ProtectedRoute>
            <NovaTransacao />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;