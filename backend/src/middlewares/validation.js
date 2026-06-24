const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateAtivarConta = (req, res, next) => {
  const { cpf, email, senha } = req.body || {};
  const erros = [];

  if (!cpf || String(cpf).replace(/\D/g, '').length !== 11) {
    erros.push('CPF é obrigatório e deve ter 11 dígitos.');
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    erros.push('Email é obrigatório e deve ser válido.');
  }
  if (!senha || typeof senha !== 'string' || senha.length < 6) {
    erros.push('Senha é obrigatória e deve ter pelo menos 6 caracteres.');
  }

  if (erros.length > 0) return res.status(400).json({ error: erros.join(' ') });
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

  if (erros.length > 0) return res.status(400).json({ error: erros.join(' ') });
  next();
};

const validateSocialLogin = (req, res, next) => {
  const { email } = req.body || {};
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Email é obrigatório e deve ser válido.' });
  }
  next();
};

module.exports = { validateAtivarConta, validateLogin, validateSocialLogin };
