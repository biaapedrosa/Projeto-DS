// Importa o pool de conexões com o PostgreSQL
const pool = require('../db');

// Busca um plano alimentar pelo ID (ex: para exibir os detalhes de um plano específico)
const findById = async (id) => {
  const result = await pool.query('SELECT * FROM plano_alimentar WHERE id = $1', [id]);
  return result.rows[0]; // undefined se não encontrar
};

// Busca todos os planos de um paciente específico
// Usado para exibir o histórico de planos no dashboard do paciente
const findByPacienteId = async (paciente_id) => {
  const result = await pool.query('SELECT * FROM plano_alimentar WHERE paciente_id = $1', [paciente_id]);
  return result.rows; // pode retornar um array vazio se o paciente não tiver planos
};

// Cria um novo plano alimentar no banco
// Requer: ID do paciente, ID do nutricionista, descrição e status do plano
const create = async ({ paciente_id, nutricionista_id, descricao, status }) => {
  const result = await pool.query(
    'INSERT INTO plano_alimentar (paciente_id, nutricionista_id, descricao, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [paciente_id, nutricionista_id, descricao, status]
  );
  // RETURNING * devolve o plano criado com o ID gerado automaticamente pelo banco
  return result.rows[0];
};

// Atualiza descrição e status de um plano existente
// Ex: mudar um plano de 'ativo' para 'concluido'
const update = async (id, { descricao, status }) => {
  const result = await pool.query(
    'UPDATE plano_alimentar SET descricao = $1, status = $2 WHERE id = $3 RETURNING *',
    [descricao, status, id]
  );
  return result.rows[0];
};

// Remove um plano pelo ID
// Chamado pelo service após confirmar que o plano existe
const remove = async (id) => {
  await pool.query('DELETE FROM plano_alimentar WHERE id = $1', [id]);
};

// Exporta as funções para uso no planoAlimentarService e pacienteService
module.exports = { findById, findByPacienteId, create, update, remove };
