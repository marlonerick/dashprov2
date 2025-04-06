// database/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'dados.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro de conexão ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});
// Criar tabela caso não exista
db.run(`CREATE TABLE IF NOT EXISTS acoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    acao TEXT,
    organizador TEXT,
    valor TEXT,
    membros TEXT,
    ganhou TEXT,
    data_acao TEXT NOT NULL
)`);

// Criar tabela de vendas caso não exista
db.run(`CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto TEXT,
    quantidade INTEGER,
    familia TEXT,
    valor TEXT,
    membro TEXT,
    data_vendas TEXT NOT NULL
)`);
// Criar tabela de compras caso não exista
db.run(`CREATE TABLE IF NOT EXISTS compras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto TEXT,
    quantidade INTEGER,
    valor TEXT,
    responsavel TEXT,
    data_compras TEXT NOT NULL
)`);

// Criação da tabela 'metas_membros'
db.run(`
    CREATE TABLE IF NOT EXISTS metas_membros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        forma_pagamento TEXT NOT NULL CHECK(forma_pagamento IN ('Dinheiro', 'Item', 'Material')),
        valor_pago INTEGER DEFAULT NULL,
        item_entregue TEXT DEFAULT NULL,
        material TEXT DEFAULT NULL,
        data_pagamento TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('Pago', 'Pendente'))
);
`);

// Criação da tabela 'encomendas' caso não exista
db.run(`
    CREATE TABLE IF NOT EXISTS encomendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        telefone TEXT,
        familia TEXT,
        produto TEXT,
        quantidade INTEGER,
        data TEXT
)`);
// Criação da tabela 'registro' caso não exista
db.run(`
    CREATE TABLE IF NOT EXISTS registros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        vulgo TEXT NOT NULL,
        id_cpf TEXT NOT NULL,
        telefone TEXT NOT NULL,
        data_registro TEXT NOT NULL
)`);

db.run(
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      nivel_acesso TEXT NOT NULL CHECK(nivel_acesso IN ('adm', 'gerente', 'membro'))
    )`
  );

module.exports = db;
