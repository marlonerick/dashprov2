const express = require("express");
const router = express.Router();
const db = require("../database/db.js");

// Rota para buscar todas as compras
router.get("/", (req, res) => {
    db.all("SELECT * FROM encomendas", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar uma nova encomendas
router.post("/", (req, res) => {
    const { nome, telefone, familia, produto, quantidade, data} = req.body;

    if (!nome || !telefone || !familia || !produto || !quantidade || !data ) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const sql = `INSERT INTO encomendas (nome, telefone, familia, produto, quantidade, data) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [nome, telefone, familia, produto, quantidade, data];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: "Encomenda cadastrada com sucesso!" });
    });
});

// Rota para atualizar uma encomenda existente
router.put("/:id", (req, res) => {
    const { nome, telefone, familia, produto, quantidade, data } = req.body;
    const { id } = req.params;

    const sql = `UPDATE encomendas SET nome = ?, telefone = ?, familia = ?, produto = ?, quantidade = ?, data = ? WHERE id = ?`;
    const params = [nome, telefone, familia, produto, quantidade, data, id];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Compra atualizada com sucesso!" });
    });
});

// Rota para deletar uma venda
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM encomendas WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Encomenda removida com sucesso!" });
    });
});

module.exports = router;
