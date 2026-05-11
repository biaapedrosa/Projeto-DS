require('dotenv').config({ path: require('path').join(__dirname, '../../../.env') });
const fs = require('fs');
const path = require('path');
const pool = require('../index');

const runMigrations = async () => {
  const migrationsDir = path.join(__dirname);
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log(`Executando migration: ${file}`);
    await pool.query(sql);
    console.log(`✅ ${file} executado com sucesso!`);
  }

  console.log('✅ Todas as migrations executadas!');
  process.exit(0);
};

runMigrations().catch((err) => {
  console.error('❌ Erro ao executar migrations:', err);
  process.exit(1);
});