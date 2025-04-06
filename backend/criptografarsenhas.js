const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./database/db.js"); // Confirme se o caminho está certo

db.all("SELECT usuario, senha FROM usuarios", async (err, rows) => {
  if (err) return console.error("Erro ao buscar usuários:", err);

  for (let user of rows) {
    // Verifica se a senha já está criptografada (evita recriptografar)
    if (user.senha.length < 60) {
      const hash = await bcrypt.hash(user.senha, 10);
      db.run("UPDATE usuarios SET senha = ? WHERE usuario = ?", [hash, user.usuario], (err) => {
        if (err) console.error(`Erro ao atualizar senha de ${user.usuario}:`, err);
        else console.log(`Senha do usuário ${user.usuario} criptografada!`);
      });
    }
  }
});
