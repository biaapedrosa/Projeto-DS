const bcrypt = require('bcryptjs');
const nutricionistaRepository = require('../repositories/nutricionistaRepository');

const create = async ({ nome, cpf, email, telefone, crn, senha, role }) => {
  if (!nome || !cpf || !email || !telefone || !senha) {
    throw new Error('Nome, CPF, e-mail, telefone e senha são obrigatórios.');
  }

  // Remove a máscara do CPF (pontos/traço) — a coluna aceita só os 11 dígitos.
  const cpfLimpo = String(cpf).replace(/\D/g, '');
  if (cpfLimpo.length !== 11) throw new Error('CPF deve conter 11 dígitos.');

  const existente = await nutricionistaRepository.findByEmail(email);
  if (existente) throw new Error('Email já cadastrado!');

  const senhaHash = await bcrypt.hash(senha, 10);
  return nutricionistaRepository.create({ nome, cpf: cpfLimpo, email, telefone, crn, senha: senhaHash, role });
};

const findAll = () => nutricionistaRepository.findAll();

const remove = async (id) => {
  const nutricionista = await nutricionistaRepository.findById(id);
  if (!nutricionista) throw new Error('Nutricionista não encontrado!');
  return nutricionistaRepository.remove(id);
};

module.exports = { create, findAll, remove };
