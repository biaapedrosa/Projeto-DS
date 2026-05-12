// Importa o pool de conexões com o banco de dados PostgreSQL
// O pool é compartilhado por toda a aplicação para evitar abrir muitas conexões
const pool = require('../db');

// Busca todas as notícias, ordenadas da mais recente para a mais antiga
const findAll = async () => {
  // pool.query executa um comando SQL e retorna um objeto com os resultados em .rows
  const result = await pool.query('SELECT * FROM noticia ORDER BY data_publicacao DESC');
  return result.rows; // retorna o array de objetos com cada notícia
};

// Busca uma única notícia pelo ID
// O $1 é um placeholder que o PostgreSQL substitui pelo valor do array [id]
// Isso evita SQL Injection — o banco trata o valor com segurança
const findById = async (id) => {
  const result = await pool.query('SELECT * FROM noticia WHERE id = $1', [id]);
  return result.rows[0]; // rows[0] porque esperamos só um resultado
};

// Cria uma nova notícia no banco de dados
// NOW() é uma função do PostgreSQL que insere a data/hora atual automaticamente
const create = async ({ titulo, conteudo }) => {
  const result = await pool.query(
    'INSERT INTO noticia (titulo, conteudo, data_publicacao) VALUES ($1, $2, NOW()) RETURNING *',
    [titulo, conteudo]
  );
  // RETURNING * faz o banco devolver o registro recém-inserido
  return result.rows[0];
};

// Atualiza o título e conteúdo de uma notícia existente
const update = async (id, { titulo, conteudo }) => {
  const result = await pool.query(
    'UPDATE noticia SET titulo = $1, conteudo = $2 WHERE id = $3 RETURNING *',
    [titulo, conteudo, id]
  );
  return result.rows[0]; // retorna a notícia já atualizada
};

// Remove uma notícia pelo ID — não retorna nada após a deleção
const remove = async (id) => {
  await pool.query('DELETE FROM noticia WHERE id = $1', [id]);
};

// Exporta todas as funções para serem usadas pelo noticiaService
module.exports = { findAll, findById, create, update, remove };
