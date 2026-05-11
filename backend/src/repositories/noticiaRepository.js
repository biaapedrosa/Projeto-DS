const pool = require('../db');

const findAll = async () => {
  const result = await pool.query('SELECT * FROM noticia ORDER BY data_publicacao DESC');
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query('SELECT * FROM noticia WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async ({ titulo, conteudo }) => {
  const result = await pool.query(
    'INSERT INTO noticia (titulo, conteudo, data_publicacao) VALUES ($1, $2, NOW()) RETURNING *',
    [titulo, conteudo]
  );
  return result.rows[0];
};

const update = async (id, { titulo, conteudo }) => {
  const result = await pool.query(
    'UPDATE noticia SET titulo = $1, conteudo = $2 WHERE id = $3 RETURNING *',
    [titulo, conteudo, id]
  );
  return result.rows[0];
};
const remove = async (id) => {
  await pool.query('DELETE FROM noticia WHERE id = $1', [id]);
};

module.exports = { findAll, findById, create, update, remove };