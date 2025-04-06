const express = require("express");
const router = express.Router();
const db = require("../database/db.js");

// Rota para buscar todas as vendas
router.get("/", (req, res) => {
    db.all("SELECT * FROM vendas", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar uma nova venda
router.post("/", (req, res) => {
    const { produto, quantidade, familia, valor, membro, data_vendas } = req.body;

    if (!produto || !quantidade || !familia || !valor || !membro || !data_vendas) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const sql = `INSERT INTO vendas (produto, quantidade, familia, valor, membro, data_vendas) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [produto, quantidade, familia, valor, membro, data_vendas];

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Erro ao inserir no banco:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: "Venda cadastrada com sucesso!" });
    });
});


// Rota para atualizar uma venda existente
router.put("/:id", (req, res) => {
    const { produto, quantidade, familia, valor, membro, data_vendas} = req.body;
    const { id } = req.params;

    const sql = `UPDATE vendas SET produto = ?, quantidade = ?, familia = ?, valor = ?, membro = ?, data_vendas = ? WHERE id = ?`;
    const params = [produto, quantidade, familia, valor, membro, data_vendas, id];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Venda atualizada com sucesso!" });
    });
});

// Rota para deletar uma venda
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM vendas WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Venda removida com sucesso!" });
    });
});

module.exports = router;
