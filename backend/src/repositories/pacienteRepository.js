// Importa o pool de conexões com o PostgreSQL
const pool = require('../db');

// Busca um paciente pelo email — usado no processo de login e de verificação de duplicidade
const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM paciente WHERE email = $1', [email]);
  return result.rows[0]; // retorna undefined se não encontrar (importante checar no service)
};

// Cria um novo paciente no banco
// A senha já deve chegar com hash (feito pelo authService antes de chamar aqui)
const create = async ({ nome, email, senha, dados_pessoais }) => {
  const result = await pool.query(
    'INSERT INTO paciente (nome, email, senha, dados_pessoais) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, email, senha, dados_pessoais]
  );
  // RETURNING * faz o banco devolver o paciente inserido, incluindo o id gerado automaticamente
  return result.rows[0];
};

// Busca um paciente pelo ID — usado para exibir perfil ou verificar existência
const findById = async (id) => {
  const result = await pool.query('SELECT * FROM paciente WHERE id = $1', [id]);
  return result.rows[0];
};

// Atualiza os dados do paciente (nome, email e dados_pessoais)
// Nota: a senha não é alterada aqui — seria necessária uma rota separada para isso
const update = async (id, { nome, email, dados_pessoais }) => {
  const result = await pool.query(
    'UPDATE paciente SET nome = $1, email = $2, dados_pessoais = $3 WHERE id = $4 RETURNING *',
    [nome, email, dados_pessoais, id]
  );
  return result.rows[0];
};

// Retorna todos os pacientes cadastrados, ordenados pelo ID crescente
const findAll = async () => {
  const result = await pool.query('SELECT * FROM paciente ORDER BY id');
  return result.rows;
};

// Remove um paciente pelo ID
// Antes de chamar isso, o service verifica se o paciente existe
const remove = async (id) => {
  await pool.query('DELETE FROM paciente WHERE id = $1', [id]);
};

// Exporta todas as funções para o pacienteService e authService
module.exports = { findByEmail, create, findById, update, findAll, remove };
