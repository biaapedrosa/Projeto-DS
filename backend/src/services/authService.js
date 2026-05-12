// Importa bcryptjs para fazer o hash da senha antes de salvar no banco
// Nunca salvamos a senha em texto puro — isso seria um sério problema de segurança
const bcrypt = require('bcryptjs');

// Importa jsonwebtoken para gerar o token JWT após o login bem-sucedido
const jwt = require('jsonwebtoken');

// Importa o repositório de paciente, que acessa o banco de dados
const pacienteRepository = require('../repositories/pacienteRepository');

// Carrega as variáveis de ambiente (JWT_SECRET, JWT_EXPIRES_IN)
require('dotenv').config();

// Função de registro de novo paciente
// Recebe os dados do formulário e os salva no banco com a senha protegida por hash
const register = async ({ nome, email, senha, dados_pessoais }) => {
  // Verifica se já existe um paciente com esse email no banco
  const pacienteExistente = await pacienteRepository.findByEmail(email);
  if (pacienteExistente) throw new Error('Email já cadastrado!');

  // Gera o hash da senha com "salt" de 10 rounds
  // O bcrypt transforma a senha em uma string embaralhada irreversível
  const senhaHash = await bcrypt.hash(senha, 10);

  // Salva o paciente no banco já com a senha em hash, não a original
  return await pacienteRepository.create({ nome, email, senha: senhaHash, dados_pessoais });
};

// Função de login — verifica as credenciais e retorna um token JWT
const login = async ({ email, senha }) => {
  // Busca o paciente pelo email
  const paciente = await pacienteRepository.findByEmail(email);

  // Se não encontrar, lança erro genérico (não dizemos se é o email ou a senha errados,
  // para não facilitar ataques de enumeração de usuários)
  if (!paciente) throw new Error('Email ou senha inválidos!');

  // Compara a senha digitada com o hash armazenado no banco
  // bcrypt.compare retorna true se baterem, false caso contrário
  const senhaValida = await bcrypt.compare(senha, paciente.senha);
  if (!senhaValida) throw new Error('Email ou senha inválidos!');

  // Gera um token JWT com os dados do paciente no payload (id e email)
  // O token é assinado com o segredo JWT_SECRET e expira conforme JWT_EXPIRES_IN
  return jwt.sign(
    { id: paciente.id, email: paciente.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Exporta as funções para o authController usar
module.exports = { register, login };
