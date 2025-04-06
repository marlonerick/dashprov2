import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

  return usuarioLogado ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
