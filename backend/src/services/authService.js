const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pacienteRepository = require('../repositories/pacienteRepository');
const nutricionistaRepository = require('../repositories/nutricionistaRepository');
require('dotenv').config();

const register = async ({ nome, email, senha }) => {
  const pacienteExistente = await pacienteRepository.findByEmail(email);
  if (pacienteExistente) throw new Error('Email já cadastrado!');

  const senhaHash = await bcrypt.hash(senha, 10);
  return await pacienteRepository.create({ nome, email, senha: senhaHash });
};

const login = async ({ email, senha }) => {
  let usuario = await pacienteRepository.findByEmail(email);
  let tipo = 'paciente';

  if (!usuario) {
    usuario = await nutricionistaRepository.findByEmail(email);
    tipo = 'nutricionista';
  }

  if (!usuario) throw new Error('Email ou senha inválidos!');

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('Email ou senha inválidos!');

  const payload = { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo };
  if (tipo === 'nutricionista') payload.role = usuario.role;

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const socialLogin = async (dados) => {
  const response = await api.post('/api/auth/social-login', dados);
  const token = response.data.token;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return { token, ...payload };
};

module.exports = { register, login };
