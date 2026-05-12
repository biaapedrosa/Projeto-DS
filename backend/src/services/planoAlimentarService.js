// Importa o repositório de planos para acessar o banco de dados
const planoRepository = require('../repositories/planoRepository');

// Busca um plano pelo ID e lança erro se não for encontrado
const getById = async (id) => {
  const plano = await planoRepository.findById(id);
  if (!plano) throw new Error('Plano não encontrado!');
  return plano;
};

// Cria um novo plano alimentar com os dados recebidos
// Os dados (paciente_id, nutricionista_id, descricao, status) vêm do controller
const create = async (dados) => {
  return await planoRepository.create(dados);
};

// Atualiza um plano existente e verifica se ele foi encontrado após a operação
const update = async (id, dados) => {
  const plano = await planoRepository.update(id, dados);
  if (!plano) throw new Error('Plano não encontrado!');
  return plano;
};

// Remove um plano do banco pelo ID
// Nota: não verifica existência antes — o repositório simplesmente não faz nada se não achar
const remove = async (id) => {
  await planoRepository.remove(id);
};

// Exporta as funções para o planoController
module.exports = { getById, create, update, remove };
