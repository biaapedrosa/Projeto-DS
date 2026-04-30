const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const paciente = await authService.register(req.body);
    res.status(201).json({ message: 'Paciente cadastrado com sucesso!', paciente });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout realizado com sucesso!' });
};

module.exports = { register, login, logout };