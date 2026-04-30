const pool = require('../db');

const findById = async (id) => {
  const result = await pool.query('SELECT * FROM plano_alimentar WHERE id = $1', [id]);
  
  return result.rows[0];
};

const findByPacienteId = async (paciente_id) => {
  const result = await pool.query('SELECT * FROM plano_alimentar WHERE paciente_id = $1', [paciente_id]);
  return result.rows;
};

const create = async ({ paciente_id, nutricionista_id, descricao, status }) => {
  const result = await pool.query(
    'INSERT INTO plano_alimentar (paciente_id, nutricionista_id, descricao, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [paciente_id, nutricionista_id, descricao, status]
  );
  return result.rows[0];
};

const update = async (id, { descricao, status }) => {
  const result = await pool.query(
    'UPDATE plano_alimentar SET descricao = $1, status = $2 WHERE id = $3 RETURNING *',
    [descricao, status, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM plano_alimentar WHERE id = $1', [id]);
};

module.exports = { findById, findByPacienteId, create, update, remove };