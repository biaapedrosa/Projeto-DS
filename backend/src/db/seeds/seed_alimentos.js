const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const csvPath = path.join(__dirname, 'tabela_taco.csv');

const parseCSVLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
};

const parseCSV = (content) => {
  const lines = content.split('\n').slice(1);
  const alimentos = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const cols = parseCSVLine(line);
    if (cols.length < 12) continue;

    alimentos.push({
      descricao: cols[0],
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
      restricoes: parseInt(cols[11], 10) || 0,
    });
  }
  return alimentos;
};

const seed = async () => {
  try {
    const existentes = await prisma.alimentoTaco.count();
    if (existentes > 0) {
      console.log(`Tabela alimento_taco já possui ${existentes} registro(s). Seed não executado.`);
      return;
    }

    const content = fs.readFileSync(csvPath, 'utf-8');
    const alimentos = parseCSV(content);
    console.log(`Inserindo ${alimentos.length} alimentos da tabela TACO...`);
    await prisma.alimentoTaco.createMany({ data: alimentos });
    console.log('✅ Seed da tabela TACO concluído!');
  } catch (err) {
    console.error('❌ Erro no seed:', err.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

seed();
