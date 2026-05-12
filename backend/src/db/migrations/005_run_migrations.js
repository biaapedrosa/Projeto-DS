// Script responsável por executar todas as migrations SQL na ordem correta
// Deve ser rodado manualmente: node src/db/migrations/005_run_migrations.js

// Carrega as variáveis de ambiente do .env usando o caminho absoluto até o arquivo
// (necessário porque esse script é executado de dentro de uma subpasta)
require('dotenv').config({ path: require('path').join(__dirname, '../../../.env') });

// fs: módulo nativo do Node para ler arquivos do disco
const fs = require('fs');

// path: módulo nativo para montar caminhos de arquivo de forma segura entre sistemas operacionais
const path = require('path');

// Importa o pool de conexões com o banco para executar os SQLs
const pool = require('../index');

const runMigrations = async () => {
  // __dirname é o diretório onde esse arquivo está localizado
  const migrationsDir = path.join(__dirname);

  // Lista todos os arquivos da pasta, filtra só os .sql e ordena pelo nome
  // A ordenação por nome garante que 001, 002, 003... sejam executados na ordem certa
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  // Executa cada arquivo SQL sequencialmente (um de cada vez, não em paralelo)
  // O "for...of" com await garante essa ordem — um só começa depois que o anterior termina
  for (const file of files) {
    // Lê o conteúdo do arquivo SQL como texto
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

    console.log(`Executando migration: ${file}`);

    // Envia o SQL para o banco de dados executar
    await pool.query(sql);

    console.log(`✅ ${file} executado com sucesso!`);
  }

  console.log('✅ Todas as migrations executadas!');

  // Encerra o processo Node após concluir — sem isso o script ficaria travado
  // aguardando o pool fechar conexões
  process.exit(0);
};

// Inicia a execução e trata erros globais
// Se qualquer migration falhar, exibe o erro e encerra com código 1 (indicando falha)
runMigrations().catch((err) => {
  console.error('❌ Erro ao executar migrations:', err);
  process.exit(1);
});
