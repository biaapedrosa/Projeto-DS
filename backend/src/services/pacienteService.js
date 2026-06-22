const bcrypt = require('bcryptjs');
const pacienteRepository = require('../repositories/pacienteRepository');
const planoRepository = require('../repositories/planoRepository');

// Pré-cadastro feito pelo nutricionista na primeira consulta.
// Cria o registro com dados básicos; paciente ainda não pode fazer login.
const preCadastrar = async ({ nome, cpf, data_nascimento, cartao_sus, email, telefone_whatsapp }) => {
  if (!nome || !cpf) throw new Error('Nome e CPF são obrigatórios.');

  const cpfLimpo = cpf.replace(/\D/g, '');
  if (cpfLimpo.length !== 11) throw new Error('CPF deve conter 11 dígitos.');

  const existenteCpf = await pacienteRepository.findByCpf(cpfLimpo);
  if (existenteCpf) throw new Error('CPF já cadastrado.');

  if (email) {
    const existenteEmail = await pacienteRepository.findByEmail(email);
    if (existenteEmail) throw new Error('E-mail já cadastrado.');
  }

  return pacienteRepository.preCadastrar({ nome, cpf: cpfLimpo, data_nascimento, cartao_sus, email, telefone_whatsapp });
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
};

const remove = async (id) => {
  const paciente = await pacienteRepository.findById(id);
  if (!paciente) throw new Error('Paciente não encontrado!');
  await pacienteRepository.remove(id);
};

module.exports = { preCadastrar, getById, update, getPlanos, getAll, remove };
