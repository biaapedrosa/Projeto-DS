const pool = require('../db');

const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM paciente WHERE email = $1', [email]);
  return result.rows[0];
};

const create = async ({ nome, email, senha, dados_pessoais }) => {
  const result = await pool.query(
    'INSERT INTO paciente (nome, email, senha, dados_pessoais) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, email, senha, dados_pessoais]
  );
  return result.rows[0];
};

const findById = async (id) => {
  const result = await pool.query('SELECT * FROM paciente WHERE id = $1', [id]);
  return result.rows[0];
};

const update = async (id, { nome, email, dados_pessoais }) => {
  const result = await pool.query(
    'UPDATE paciente SET nome = $1, email = $2, dados_pessoais = $3 WHERE id = $4 RETURNING *',
    [nome, email, dados_pessoais, id]
  );
  return result.rows[0];
};

module.exports = { findByEmail, create, findById, update };