const pacienteRepository = require('../repositories/pacienteRepository');
const planoRepository = require('../repositories/planoRepository');

const getById = async (id) => {
  const paciente = await pacienteRepository.findById(id);
  if (!paciente) {
    throw new Error('Paciente não encontrado!');
  }
  return paciente;
};

const update = async (id, dados) => {
  const paciente = await pacienteRepository.update(id, dados);
  if (!paciente) {
    throw new Error('Paciente não encontrado!');
  }
  return paciente;
};

const getPlanos = async (id) => {
  const planos = await planoRepository.findByPacienteId(id);
  return planos;
};

module.exports = { getById, update, getPlanos };