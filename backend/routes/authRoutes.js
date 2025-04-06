const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/db.js");

const router = express.Router();

router.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  }

  db.all("SELECT * FROM usuarios WHERE usuario = ?", [usuario], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });

    if (rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

    const user = rows[0];

    bcrypt.compare(senha, user.senha, (err, result) => {
      if (result) {
        res.json({ usuario: user.usuario, nivel_acesso: user.nivel_acesso });
      } else {
        res.status(401).json({ error: "Senha incorreta" });
      }
    });
  });
});

module.exports = router;