const planoRepo = require('../repositories/planoRepository');

const getById = async (id) => planoRepo.findById(id);

const getByPaciente = async (pacienteId) => planoRepo.findByPacienteId(pacienteId);

const create = async (dados) => planoRepo.create(dados);

const update = async (id, dados) => planoRepo.update(id, dados);

const remove = async (id) => planoRepo.remove(id);

module.exports = { getById, getByPaciente, create, update, remove };
