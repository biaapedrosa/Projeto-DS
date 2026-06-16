const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegister = (req, res, next) => {
  const { nome, email, senha } = req.body || {};
  const erros = [];

  if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
    erros.push('Nome é obrigatório e deve ter pelo menos 2 caracteres.');
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    erros.push('Email é obrigatório e deve ser válido.');
  }

  if (!senha || typeof senha !== 'string' || senha.length < 6) {
    erros.push('Senha é obrigatória e deve ter pelo menos 6 caracteres.');
  }

  if (erros.length > 0) {
    return res.status(400).json({ error: erros.join(' ') });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, senha } = req.body || {};
  const erros = [];

  if (!email || !EMAIL_REGEX.test(email)) {
    erros.push('Email é obrigatório e deve ser válido.');
  }

  if (!senha) {
    erros.push('Senha é obrigatória.');
  }

  if (erros.length > 0) {
    return res.status(400).json({ error: erros.join(' ') });
  }

  next();
};

const validateSocialLogin = (req, res, next) => {
  const { email } = req.body || {};

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Email é obrigatório e deve ser válido.' });
  }

  next();
};

module.exports = { validateRegister, validateLogin, validateSocialLogin };
