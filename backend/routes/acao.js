const express = require("express");
const router = express.Router();
const db = require("../database/db.js");

// Rota para buscar todas as compras
router.get("/", (req, res) => {
    db.all("SELECT * FROM acoes", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar uma nova encomendas
router.post("/", (req, res) => {
    const { acao, organizador, valor, membros, ganhou, data_acao} = req.body;

    if (!acao || !organizador || !valor || !membros || !ganhou || !data_acao) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const sql = `INSERT INTO acoes (acao, organizador, valor, membros, ganhou, data_acao) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [acao, organizador, valor, membros, ganhou, data_acao];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: "Ação cadastrada com sucesso!" });
    });
});

// Rota para atualizar uma ação existente
router.put("/:id", (req, res) => {
    const { acao, organizador, valor, membros, ganhou, data_acao } = req.body;
    const { id } = req.params;

    const sql = `UPDATE acoes SET acao = ?, organizador = ?, valor = ?, membros = ?, ganhou = ?, data_acao = ? WHERE id = ?`;
    const params = [acao, organizador, valor, membros, ganhou, data_acao, id];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Ação atualizada com sucesso!" });
    });
});

// Rota para deletar uma ação
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM acoes WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Ação removida com sucesso!" });
    });
});

module.exports = router;
