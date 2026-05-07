const db = require('../db');

const findByEmail = async (email) => {
  const { rows } = await db.query('SELECT * FROM pacientes WHERE email = $1', [email]);
  return rows[0];
};

const findById = async (id) => {
  const { rows } = await db.query(
    'SELECT id, nome, email, dados_pessoais, created_at FROM pacientes WHERE id = $1',
    [id]
  );
  return rows[0];
};

const create = async ({ nome, email, senha }) => {
  const { rows } = await db.query(
    'INSERT INTO pacientes (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
    [nome, email, senha]
  );
  return rows[0];
};

const update = async (id, { nome, dados_pessoais }) => {
  const { rows } = await db.query(
    `UPDATE pacientes
     SET nome = COALESCE($1, nome), dados_pessoais = COALESCE($2, dados_pessoais)
     WHERE id = $3
     RETURNING id, nome, email, dados_pessoais`,
    [nome, dados_pessoais ? JSON.stringify(dados_pessoais) : null, id]
  );
  return rows[0];
};

module.exports = { findByEmail, findById, create, update };
