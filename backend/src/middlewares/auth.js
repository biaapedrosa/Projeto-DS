// Importa a biblioteca jsonwebtoken para verificar tokens JWT
const jwt = require('jsonwebtoken');

// Carrega as variáveis de ambiente, em especial o JWT_SECRET
require('dotenv').config();

// Middleware de autenticação — é uma função que roda ANTES do controller
// Ela recebe (req, res, next): req é a requisição, res é a resposta,
// e next é a função que passa o controle para o próximo handler
const auth = (req, res, next) => {
  // Pega o cabeçalho "Authorization" da requisição
  // O padrão é enviar: Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];

  // Separa o token do prefixo "Bearer "
  // authHeader.split(' ') retorna ['Bearer', '<token>'], então [1] pega só o token
  const token = authHeader && authHeader.split(' ')[1];

  // Se não veio token na requisição, bloqueia com status 401 (não autorizado)
  if (!token) return res.status(401).json({ error: 'Token não fornecido!' });

  try {
    // Verifica se o token é válido usando o segredo definido em JWT_SECRET
    // jwt.verify lança uma exceção se o token for inválido ou expirado
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Salva os dados do usuário decodificados dentro da requisição
    // Assim, os controllers conseguem saber quem está logado via req.user
    req.user = decoded;

    // Chama o próximo middleware/controller na cadeia de execução
    next();
  } catch (err) {
    // Se o token for inválido ou expirado, responde com 403 (proibido)
    return res.status(403).json({ error: 'Token inválido!' });
  }
};

// Exporta o middleware para ser usado nas rotas que precisam de autenticação
module.exports = auth;
