const express = require("express");
const router = express.Router();
const db = require("../database/db.js");

// Rota para buscar todas as compras
router.get("/", (req, res) => {
    db.all("SELECT * FROM compras", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar uma nova compra
router.post("/", (req, res) => {
    const { produto, quantidade, valor, responsavel, data_compras } = req.body;

    if (!produto || !quantidade || !valor || !responsavel || !data_compras) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const sql = `INSERT INTO compras (produto, quantidade, valor, responsavel, data_compras) VALUES (?, ?, ?, ?, ?)`;
    const params = [produto, quantidade, valor, responsavel, data_compras ];

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Erro ao inserir no banco:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: "Venda cadastrada com sucesso!" });
    });
});

// Rota para atualizar uma compra existente
router.put("/:id", (req, res) => {
    const { produto, quantidade, valor, responsavel, data_compras } = req.body;
    const { id } = req.params;

    const sql = `UPDATE compras SET produto = ?, quantidade = ?, valor = ?, responsavel = ?, data_compras = ? WHERE id = ?`;
    const params = [produto, quantidade, valor, responsavel, data_compras, id];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Compra atualizada com sucesso!" });
    });
});

// Rota para deletar uma compra
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM compras WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Compra removida com sucesso!" });
    });
});

module.exports = router;
