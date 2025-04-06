const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
const vendasRoutes = require("./routes/vendas");
app.use("/api/vendas", vendasRoutes);

const comprasRoutes = require("./routes/compras");
app.use("/api/compras", comprasRoutes);

const encomendasRoutes = require("./routes/encomendas");
app.use("/api/encomendas", encomendasRoutes);

const registroRoutes = require("./routes/registro");
app.use("/api/registros", registroRoutes);

const acoeRoutes = require("./routes/acao");
app.use("/api/acoes", acoeRoutes);

const metasMembrosRoutes = require("./routes/metas.js");
app.use("/api/metas", metasMembrosRoutes);

const loginRoutes = require("./routes/authRoutes");
app.use("/api", loginRoutes);

// Rota inicial
app.get("/", (req, res) => {
    res.send("🚀 API do Bot Rodando!");
});

// Iniciando o servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});
