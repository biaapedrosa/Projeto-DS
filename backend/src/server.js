// Carrega as variáveis de ambiente definidas no arquivo .env (como PORT, DATABASE_URL, etc.)
// O dotenv precisa ser chamado antes de tudo para que process.env funcione no resto do código
require('dotenv').config();

// Importa o objeto "app" que configuramos no arquivo app.js
// Esse app é o servidor Express com todas as rotas e middlewares já configurados
const app = require('./app');

// Define a porta em que o servidor vai rodar
// Primeiro tenta usar a variável de ambiente PORT; se não existir, usa 3001 como padrão
const PORT = process.env.PORT || 3001;

// Inicia o servidor na porta definida acima
// O segundo argumento é uma função de callback que roda quando o servidor sobe com sucesso
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
