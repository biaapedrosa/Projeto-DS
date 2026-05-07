const db = require('../db');

const findAll = async () => {
  const { rows } = await db.query('SELECT * FROM noticias ORDER BY data_publicacao DESC');
  return rows;
};

const findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM noticias WHERE id = $1', [id]);
  return rows[0];
};

const create = async ({ titulo, conteudo }) => {
  const { rows } = await db.query(
    'INSERT INTO noticias (titulo, conteudo) VALUES ($1, $2) RETURNING *',
    [titulo, conteudo]
  );
  return rows[0];
};

const update = async (id, { titulo, conteudo }) => {
  const { rows } = await db.query(
    `UPDATE noticias
     SET titulo = COALESCE($1, titulo), conteudo = COALESCE($2, conteudo)
     WHERE id = $3 RETURNING *`,
    [titulo, conteudo, id]
  );
  return rows[0];
};

module.exports = { findAll, findById, create, update };
