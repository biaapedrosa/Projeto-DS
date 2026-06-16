const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pacienteRepository = require('../repositories/pacienteRepository');
const nutricionistaRepository = require('../repositories/nutricionistaRepository');
require('dotenv').config();

// Registro de novo paciente com todos os campos da ficha clínica.
const register = async ({
  nome,
  email,
  senha,
  sexo,
  data_nascimento,
  telefone_whatsapp,
  ocupacao,
  vinculo_ufpe,
  objetivo,
  tipo_paciente,  // 'Adulto_Idoso' | 'Gestante' | 'Desportista'
  peso_maximo,    // Desportista: peso máximo histórico (opcional)
}) => {
  const existente = await pacienteRepository.findByEmail(email);
  if (existente) throw new Error('Email já cadastrado!');

  const senhaHash = await bcrypt.hash(senha, 10);

  return await pacienteRepository.create({
    nome,
    email,
    senha: senhaHash,
    sexo: sexo || null,
    data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
    telefone_whatsapp: telefone_whatsapp || null,
    ocupacao: ocupacao || null,
    vinculo_ufpe: vinculo_ufpe || null,
    objetivo: objetivo || null,
    tipo_paciente: tipo_paciente || null,
    peso_maximo: peso_maximo ? parseFloat(peso_maximo) : null,
  });
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
  if (tipo === 'paciente') payload.tipo_paciente = usuario.tipo_paciente;

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const socialLogin = async ({ nome, email }) => {
  let usuario = await pacienteRepository.findByEmail(email);

  if (!usuario) {
    const senhaHash = await bcrypt.hash(Math.random().toString(36), 10);
    usuario = await pacienteRepository.create({ nome, email, senha: senhaHash });
  }

  const payload = { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: 'paciente' };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

module.exports = { register, login, socialLogin };
