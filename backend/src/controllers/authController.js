// Importa o service de autenticação, que contém a lógica de negócio
// (verificação de email duplicado, hash de senha, geração de token JWT)
const authService = require('../services/authService');

// Controller de registro de novo paciente
// Recebe os dados do formulário via req.body e repassa ao service
const register = async (req, res) => {
  try {
    // Chama o service passando o corpo da requisição (nome, email, senha, dados_pessoais)
    const paciente = await authService.register(req.body);

    // Se deu certo, retorna status 201 (Created) com os dados do paciente criado
    res.status(201).json({ message: 'Paciente cadastrado com sucesso!', paciente });
  } catch (err) {
    // Se o service lançou um erro (ex: email já cadastrado), retorna 400 (Bad Request)
    res.status(400).json({ error: err.message });
  }
};

// Controller de login — verifica as credenciais e retorna um token JWT
const login = async (req, res) => {
  try {
    // O service faz a verificação de email e senha e retorna um token JWT se válido
    const token = await authService.login(req.body);

    // Retorna 200 (OK) com o token para o cliente armazenar (normalmente no localStorage)
    res.status(200).json({ token });
  } catch (err) {
    // Se email ou senha estiverem errados, retorna 401 (Unauthorized)
    res.status(401).json({ error: err.message });
  }
};

// Controller de logout — como usamos JWT (stateless), não há nada a fazer no servidor
// O cliente é quem deve apagar o token do armazenamento local
const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout realizado com sucesso!' });
};

// Exporta as funções para serem usadas nas rotas de autenticação
module.exports = { register, login, logout };
