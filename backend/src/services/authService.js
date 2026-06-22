const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pacienteRepository = require('../repositories/pacienteRepository');
const nutricionistaRepository = require('../repositories/nutricionistaRepository');
require('dotenv').config();

// Etapa 2 do cadastro: paciente informa CPF, e-mail e cria senha.
// O nutricionista já deve ter feito o pré-cadastro com o CPF (etapa 1).
const ativarConta = async ({ cpf, email, senha }) => {
  if (!cpf || !email || !senha) throw new Error('CPF, e-mail e senha são obrigatórios.');

  const cpfLimpo = cpf.replace(/\D/g, '');
  const paciente = await pacienteRepository.findByCpf(cpfLimpo);

  if (!paciente) throw new Error('CPF não encontrado. Verifique com o nutricionista se o pré-cadastro foi realizado.');
  if (paciente.conta_ativada) throw new Error('Conta já ativada. Faça login normalmente.');

  // Valida o e-mail informado com o que foi registrado pelo nutricionista (se houver)
  if (paciente.email && paciente.email !== email) {
    throw new Error('O e-mail informado não confere com o cadastrado. Verifique com o nutricionista.');
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const pacienteAtualizado = await pacienteRepository.ativarConta(paciente.id, { email, senha: senhaHash });

  const payload = { id: pacienteAtualizado.id, nome: pacienteAtualizado.nome, email: pacienteAtualizado.email, tipo: 'paciente' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });

  return { token, usuario: { id: pacienteAtualizado.id, nome: pacienteAtualizado.nome, email: pacienteAtualizado.email, tipo: 'paciente' } };
};

const login = async ({ email, senha }) => {
  let usuario = await pacienteRepository.findByEmail(email);
  let tipo = 'paciente';

  if (!usuario) {
    usuario = await nutricionistaRepository.findByEmail(email);
    tipo = 'nutricionista';
  }

  if (!usuario) throw new Error('E-mail ou senha inválidos!');

  // Paciente sem conta ativada ainda não tem senha
  if (tipo === 'paciente' && !usuario.conta_ativada) {
    throw new Error('Conta ainda não ativada. Acesse a tela de cadastro para criar sua senha.');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('E-mail ou senha inválidos!');

  const payload = { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo };
  if (tipo === 'nutricionista') payload.role = usuario.role;

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });

  return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo, role: usuario.role || null } };
};

const socialLogin = async ({ nome, email }) => {
  let usuario = await pacienteRepository.findByEmail(email);

  if (!usuario) {
    const senhaHash = await bcrypt.hash(Math.random().toString(36), 10);
    usuario = await pacienteRepository.preCadastrar({ nome, email, cpf: null, cartao_sus: null, data_nascimento: null, telefone_whatsapp: null });
    await pacienteRepository.ativarConta(usuario.id, { email, senha: senhaHash });
    usuario = await pacienteRepository.findByEmail(email);
  }

  const payload = { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: 'paciente' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });

  return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: 'paciente' } };
};

module.exports = { ativarConta, login, socialLogin };
