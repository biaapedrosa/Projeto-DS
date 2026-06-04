const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido!' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido!' });
  }
};

const authorize = (...perfisPermitidos) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Token não fornecido!' });

  const { tipo, role } = req.user;
  if (perfisPermitidos.includes(tipo) || (role && perfisPermitidos.includes(role))) {
    return next();
  }

  return res.status(403).json({ error: 'Acesso não autorizado para este perfil!' });
};

module.exports = auth;
module.exports.authorize = authorize;