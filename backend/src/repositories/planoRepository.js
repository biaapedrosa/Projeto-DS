const db = require('../db');

const findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM planos_alimentares WHERE id = $1', [id]);
  return rows[0];
};

const findByPacienteId = async (pacienteId) => {
  const { rows } = await db.query(
    'SELECT * FROM planos_alimentares WHERE paciente_id = $1 ORDER BY data_criacao DESC',
    [pacienteId]
  );
  return rows;
};

const create = async ({ paciente_id, nutricionista_id, descricao, status }) => {
  const { rows } = await db.query(
    `INSERT INTO planos_alimentares (paciente_id, nutricionista_id, descricao, status)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [paciente_id, nutricionista_id, descricao, status || 'ativo']
  );
  return rows[0];
};

const update = async (id, { descricao, status }) => {
  const { rows } = await db.query(
    `UPDATE planos_alimentares
     SET descricao = COALESCE($1, descricao), status = COALESCE($2, status)
     WHERE id = $3 RETURNING *`,
    [descricao, status, id]
  );
  return rows[0];
};

const remove = async (id) => {
  await db.query('DELETE FROM planos_alimentares WHERE id = $1', [id]);
};

module.exports = { findById, findByPacienteId, create, update, remove };
