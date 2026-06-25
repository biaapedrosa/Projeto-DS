import api from './api';

// Decodifica o payload do JWT e monta o objeto de usuário usado no app.
// Importante: o payload é base64url e vem em UTF-8. Usar apenas atob() quebra
// caracteres acentuados (ex.: "João" → "JoÃ£o"), pois atob devolve uma binary
// string em Latin-1. Convertendo byte a byte para %XX e usando decodeURIComponent
// interpretamos os bytes corretamente como UTF-8.
const decodeBase64Url = (b64url) => {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  const escaped = Array.from(bin, (c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  return decodeURIComponent(escaped);
};

const decode = (token) => {
  const payload = JSON.parse(decodeBase64Url(token.split('.')[1]));
  return {
    token,
    id: payload.id,
    nome: payload.nome,
    email: payload.email,
    tipo: payload.tipo,
    role: payload.role,
  };
};

const login = async (dados) => {
  const { data } = await api.post('/api/auth/login', dados);
  return decode(data.token);
};

// Login social (Google via Auth0). Backend cria/ativa o paciente se necessário.
const socialLogin = async ({ nome, email }) => {
  const { data } = await api.post('/api/auth/social-login', { nome, email });
  return decode(data.token);
};

// Etapa 2 do cadastro do paciente: ativa a conta com cpf, email e senha.
// O nutricionista precisa ter feito o pré-cadastro com esse CPF antes.
const ativarConta = async ({ cpf, email, senha }) => {
  const { data } = await api.post('/api/auth/ativar-conta', { cpf, email, senha });
  return decode(data.token);
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('nutriflow:user');
};

export default { login, socialLogin, ativarConta, logout };