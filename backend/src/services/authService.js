const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pacienteRepository = require('../repositories/pacienteRepository');
require('dotenv').config();

const register = async ({ nome, email, senha, dados_pessoais }) => {
  const pacienteExistente = await pacienteRepository.findByEmail(email);
  if (pacienteExistente) {
    throw new Error('Email já cadastrado!');
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const paciente = await pacienteRepository.create({
    nome,
    email,
    senha: senhaHash,
    dados_pessoais
  });

  return paciente;
};

const login = async ({ email, senha }) => {
  const paciente = await pacienteRepository.findByEmail(email);
  if (!paciente) {
    throw new Error('Email ou senha inválidos!');
  }

  const senhaValida = await bcrypt.compare(senha, paciente.senha);
  if (!senhaValida) {
    throw new Error('Email ou senha inválidos!');
  }

  const token = jwt.sign(
    { id: paciente.id, email: paciente.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return token;
};

module.exports = { register, login };