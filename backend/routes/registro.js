const express = require("express");
const router = express.Router();
const db = require("../database/db.js");

// Rota para buscar todas as compras
router.get("/", (req, res) => {
    db.all("SELECT * FROM registros", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar um novo registro
router.post("/", (req, res) => {
    const { nome, vulgo, id_cpf, telefone, data_registro} = req.body;

    if (!nome || !vulgo || !id_cpf || !telefone || !data_registro ) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const sql = `INSERT INTO registros ( nome, vulgo, id_cpf, telefone, data_registro) VALUES (?, ?, ?, ?, ?)`;
    const params = [ nome, vulgo, id_cpf, telefone, data_registro];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: "Registro cadastrada com sucesso!" });
    });
});

// Rota para atualizar uma registro existente
router.put("/:id", (req, res) => {
    const { nome, vulgo, id_cpf, telefone, data_registro } = req.body;
    const { id } = req.params;

    const sql = `UPDATE registros SET nome = ?, vulgo = ?, id_cpf = ?, telefone = ?, data_registro = ? WHERE id = ?`;
    const params = [nome, vulgo, id_cpf, telefone, data_registro, id];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "registro atualizada com sucesso!" });
    });
});

// Rota para deletar uma registro
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM registros WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Compra removida com sucesso!" });
    });
});

module.exports = router;
