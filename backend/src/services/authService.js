const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pacienteRepo = require('../repositories/pacienteRepository');
const nutricionistaRepo = require('../repositories/nutricionistaRepository');

const register = async ({ nome, email, senha }) => {
  const existing = await pacienteRepo.findByEmail(email);
  if (existing) throw new Error('Email já cadastrado');

  const hash = await bcrypt.hash(senha, 10);
  return pacienteRepo.create({ nome, email, senha: hash });
};

const login = async ({ email, senha }) => {
  let user = await pacienteRepo.findByEmail(email);
  let role = 'paciente';

  if (!user) {
    user = await nutricionistaRepo.findByEmail(email);
    role = 'nutricionista';
  }

  if (!user) throw new Error('Credenciais inválidas');

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) throw new Error('Credenciais inválidas');

  const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user.id, nome: user.nome, email: user.email, role } };
};

module.exports = { register, login };
