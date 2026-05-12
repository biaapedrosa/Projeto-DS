// Importa o framework Express, que é a base do nosso servidor HTTP
const express = require('express');

// Importa o cors (Cross-Origin Resource Sharing) — permite que o frontend
// (rodando em outra porta/domínio) consiga se comunicar com esta API
const cors = require('cors');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa os arquivos de rotas — cada módulo agrupa as rotas de um recurso específico
const authRoutes = require('./routes/authRoutes');       // rotas de login/cadastro/logout
const pacienteRoutes = require('./routes/pacienteRoutes'); // rotas de CRUD de pacientes
const planoRoutes = require('./routes/planoRoutes');       // rotas de CRUD de planos alimentares
const noticiaRoutes = require('./routes/noticiaRoutes');   // rotas de CRUD de notícias

// Cria a aplicação Express — é o objeto central que gerencia todas as requisições
const app = express();

// Habilita o CORS para todas as origens (qualquer cliente pode acessar a API)
// Em produção, seria bom restringir para o domínio do frontend
app.use(cors());

// Permite que o servidor entenda e parse o corpo das requisições no formato JSON
// Sem isso, req.body ficaria undefined nas rotas POST/PUT
app.use(express.json());

// Registra as rotas com seus prefixos de URL
// Ex: uma rota definida como router.post('/login') em authRoutes
// vai responder em POST /api/auth/login
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/planos', planoRoutes);
app.use('/api/noticias', noticiaRoutes);

// Rota raiz — útil para testar se a API está online (GET /)
app.get('/', (req, res) => {
  res.json({ message: '✅ API Clínica de Nutrição funcionando!' });
});

// Exporta o app para ser usado pelo server.js, que vai inicializar o servidor
module.exports = app;
