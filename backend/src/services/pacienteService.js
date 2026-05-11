const pacienteRepository = require('../repositories/pacienteRepository');
const planoRepository = require('../repositories/planoRepository');

const getById = async (id) => {
  const paciente = await pacienteRepository.findById(id);
  if (!paciente) throw new Error('Paciente não encontrado!');
  return paciente;
};

const update = async (id, dados) => {
  const paciente = await pacienteRepository.update(id, dados);
  if (!paciente) throw new Error('Paciente não encontrado!');
  return paciente;
};

const getPlanos = async (id) => {
  return await planoRepository.findByPacienteId(id);
};
const getAll = async () => {
  return await pacienteRepository.findAll();
}
const remove = async (id) => {
  const paciente = await pacienteRepository.findById(id);
  if (!paciente) throw new Error('Paciente não encontrado!');
  await pacienteRepository.remove(id);
}
module.exports = { getById, update, getPlanos, getAll, remove };