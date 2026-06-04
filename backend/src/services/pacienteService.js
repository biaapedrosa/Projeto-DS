const bcrypt = require('bcryptjs');
const pacienteRepository = require('../repositories/pacienteRepository');
const planoRepository = require('../repositories/planoRepository');

const create = async ({ nome, email, senha, sexo, data_nascimento, idade, telefone_whatsapp, ocupacao, vinculo_ufpe, objetivo }) => {
  const existente = await pacienteRepository.findByEmail(email);
  if (existente) throw new Error('Email já cadastrado!');
  const senhaHash = await bcrypt.hash(senha, 10);
  return pacienteRepository.create({ nome, email, senha: senhaHash, sexo, data_nascimento, idade, telefone_whatsapp, ocupacao, vinculo_ufpe, objetivo });
};

const getById = async (id) => {
  const paciente = await pacienteRepository.findById(id);
  if (!paciente) throw new Error('Paciente não encontrado!');
  return paciente;
};

const update = async (id, dados) => {
  const paciente = await pacienteRepository.findById(id);
  if (!paciente) throw new Error('Paciente não encontrado!');
  return pacienteRepository.update(id, dados);
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
module.exports = { create, getById, update, getPlanos, getAll, remove };