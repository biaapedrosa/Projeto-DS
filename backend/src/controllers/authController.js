const authService = require('../services/authService');

// Etapa 2 do cadastro do paciente: ativa conta com CPF, e-mail e senha
const ativarConta = async (req, res) => {
  try {
    const resultado = await authService.ativarConta(req.body);
    res.status(200).json({ message: 'Conta ativada com sucesso!', ...resultado });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const resultado = await authService.login(req.body);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout realizado com sucesso!' });
};

const socialLogin = async (req, res) => {
  try {
    const resultado = await authService.socialLogin(req.body);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { ativarConta, login, logout, socialLogin };
