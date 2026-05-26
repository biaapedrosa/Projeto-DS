const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const csvPath = path.join(__dirname, 'tabela_taco.csv');

const parseCSV = (content) => {
  const lines = content.split('\n').slice(1); // pula o header
  const alimentos = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    const cols = line.split(',');
    if (cols.length < 11) continue;

    alimentos.push({
      descricao: cols[0].replace(/"/g, '').trim(),
      energia_kcal: parseFloat(cols[1]) || null,
      energia_kj: parseFloat(cols[2]) || null,
      proteina_g: parseFloat(cols[3]) || null,
      lipideos_g: parseFloat(cols[4]) || null,
      carboidratos_g: parseFloat(cols[5]) || null,
      calcio_mg: parseFloat(cols[6]) || null,
      ferro_mg: parseFloat(cols[7]) || null,
      retinol_mcg: parseFloat(cols[8]) || null,
      vitamina_c_mg: parseFloat(cols[9]) || null,
      sodio_mg: parseFloat(cols[10]) || null,
      restricoes: parseInt(cols[11]) || 0,
    });
  }

  return alimentos;
};

const seed = async () => {
  try {
    const content = fs.readFileSync(csvPath, 'utf-8');
    const alimentos = parseCSV(content);

    console.log(`Inserindo ${alimentos.length} alimentos...`);

    for (const a of alimentos) {
      await pool.query(
        `INSERT INTO alimento (descricao, energia_kcal, energia_kj, proteina_g, lipideos_g, carboidratos_g, calcio_mg, ferro_mg, retinol_mcg, vitamina_c_mg, sodio_mg, restricoes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         ON CONFLICT DO NOTHING`,
        [a.descricao, a.energia_kcal, a.energia_kj, a.proteina_g, a.lipideos_g, a.carboidratos_g, a.calcio_mg, a.ferro_mg, a.retinol_mcg, a.vitamina_c_mg, a.sodio_mg, a.restricoes]
      );
    }

    console.log('✅ Seed concluído!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro no seed:', err.message);
    process.exit(1);
  }
};

seed();