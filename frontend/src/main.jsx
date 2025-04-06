import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../src/login.jsx";
import App from "./App"; // Seu dashboard principal
import "./index.css";
import ProtectedRoute from "./ProtectedRoute";
import { Vendas } from "./pages/vendas/vendas";
import { Cadastro } from "./pages/registro/cadastro";
import { Compras } from "./pages/compras/compras";
import { Acao } from "./pages/acao/acao";
import { Encomendas } from "./pages/encomendas/encomendas";
import { Metas } from "./pages/metas/metas";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastro"
          element={
            <ProtectedRoute>
              <Cadastro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendas"
          element={
            <ProtectedRoute>
              <Vendas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compras"
          element={
            <ProtectedRoute>
              <Compras />
            </ProtectedRoute>
          }
        />
        <Route
          path="/acao"
          element={
            <ProtectedRoute>
              <Acao />
            </ProtectedRoute>
          }
        />
        <Route
          path="/encomendas"
          element={
            <ProtectedRoute>
              <Encomendas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metas"
          element={
            <ProtectedRoute>
              <Metas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
