// Importa o repositório de paciente para acessar o banco de dados
const pacienteRepository = require('../repositories/pacienteRepository');

// Importa o repositório de plano para buscar os planos de um paciente
const planoRepository = require('../repositories/planoRepository');

// Busca um paciente pelo ID e lança erro se não existir
const getById = async (id) => {
  const paciente = await pacienteRepository.findById(id);

  // O repositório retorna undefined se não encontrar — verificamos aqui e lançamos erro
  if (!paciente) throw new Error('Paciente não encontrado!');
  return paciente;
};

// Atualiza os dados de um paciente e verifica se ele existe após a operação
const update = async (id, dados) => {
  const paciente = await pacienteRepository.update(id, dados);

  // Se o update não encontrou o paciente, o repositório retorna undefined
  if (!paciente) throw new Error('Paciente não encontrado!');
  return paciente;
};

// Retorna todos os planos alimentares associados a um paciente
// Delega direto ao repositório de planos — sem validação extra aqui
const getPlanos = async (id) => {
  return await planoRepository.findByPacienteId(id);
};

// Retorna todos os pacientes cadastrados no sistema
const getAll = async () => {
  return await pacienteRepository.findAll();
};

// Remove um paciente do banco, verificando se ele existe antes
const remove = async (id) => {
  const paciente = await pacienteRepository.findById(id);
  if (!paciente) throw new Error('Paciente não encontrado!');
  await pacienteRepository.remove(id);
};

// Exporta todas as funções para o pacienteController
module.exports = { getById, update, getPlanos, getAll, remove };
