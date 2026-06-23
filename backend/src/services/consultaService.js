const consultaRepository = require('../repositories/consultaRepository');

const getById = async (id) => {
  const consulta = await consultaRepository.findById(id);
  if (!consulta) throw new Error('Ficha médica não encontrada!');
  return consulta;
};

const getByPaciente = async (paciente_id) => {
  if (!paciente_id) throw new Error('paciente_id é obrigatório!');
  return await consultaRepository.findByPacienteId(paciente_id);
};

const create = async (dados) => {
  const { paciente_id, nutricionista_id, data_consulta } = dados;
  if (!paciente_id || !nutricionista_id || !data_consulta) {
    throw new Error('paciente_id, nutricionista_id e data_consulta são obrigatórios!');
  }
  return await consultaRepository.create(dados);
};

const update = async (id, dados) => {
  const consulta = await consultaRepository.findById(id);
  if (!consulta) throw new Error('Ficha médica não encontrada!');
  return consultaRepository.update(id, dados);
};

const remove = async (id) => {
  const consulta = await consultaRepository.findById(id);
  if (!consulta) throw new Error('Ficha médica não encontrada!');
  await consultaRepository.remove(id);
};

module.exports = { getById, getByPaciente, create, update, remove };