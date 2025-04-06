const express = require("express");
const router = express.Router();
const db = require("../database/db.js");

// Rota para buscar todas as vendas
router.get("/", (req, res) => {
    db.all("SELECT * FROM metas_membros", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Adicionar novo pagamento
router.post("/", async (req, res) => {
  const { nome, forma_pagamento, valor_pago, item_entregue, material, data_pagamento } = req.body;
  const status = "Pago";

  const sql ="INSERT INTO metas_membros (nome, forma_pagamento, valor_pago, item_entregue, material, data_pagamento, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const params = [
        nome,
        forma_pagamento,
        valor_pago ? parseFloat(valor_pago) : null,
        item_entregue || null,
        material || null,
        data_pagamento,
        status
      ]
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
  const { nome, forma_pagamento, valor_pago, item_entregue, material, data_pagamento } = req.body;
  const { id } = req.params;
  const status = "Pago";

    const sql = `UPDATE metas_membros SET nome = ?, forma_pagamento = ?, valor_pago = ?, item_entregue = ?, material = ?, data_pagamento = ?, status = ? WHERE id = ?`;
    const params = [
      nome,
      forma_pagamento,
      valor_pago ? parseFloat(valor_pago) : null,
      item_entregue || null,
      material || null,
      data_pagamento,
      status,
      id
    ]

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Venda atualizada com sucesso!" });
    });
});

// Remover pagamento
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM metas_membros WHERE id = ?`, id, function (err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Meta removida com sucesso!" });
  });
});

module.exports = router;