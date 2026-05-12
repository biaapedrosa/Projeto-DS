// Importa a classe Pool da biblioteca "pg" (node-postgres)
// Um Pool gerencia múltiplas conexões com o banco de dados ao mesmo tempo,
// o que é muito mais eficiente do que abrir e fechar uma conexão a cada requisição
const { Pool } = require('pg');

// Carrega as variáveis de ambiente para que DATABASE_URL esteja disponível
require('dotenv').config();

// Cria o pool de conexões usando a string de conexão definida no .env
// A DATABASE_URL tem o formato: postgres://usuario:senha@host:porta/banco
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Testa a conexão ao banco assim que o módulo é carregado
// Se der certo, exibe confirmação; se der errado, exibe o erro no console
pool.connect()
  .then(() => console.log('✅ Conectado ao PostgreSQL'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco:', err));

// Exporta o pool para ser reutilizado em todos os repositórios do projeto
// Assim, todos compartilham o mesmo pool, sem criar conexões duplicadas
module.exports = pool;
