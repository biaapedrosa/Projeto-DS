// Seed de bootstrap: cria o primeiro admin do sistema.
// Sem isso não há como criar nutricionistas (POST /api/nutricionistas exige admin).
// Idempotente: se o admin já existir (por e-mail), não duplica.
//
// Uso: npm run db:seed   (ou prisma db seed)
// Credenciais configuráveis por env: ADMIN_EMAIL, ADMIN_SENHA, ADMIN_CPF.

const bcrypt = require('bcryptjs');
const prisma = require('../src/db');

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@clinica.com';
  const senha = process.env.ADMIN_SENHA || 'admin123';
  const cpf = process.env.ADMIN_CPF || '00000000000';
  const telefone = process.env.ADMIN_TELEFONE || '00000000000';

  const existente = await prisma.nutricionista.findUnique({ where: { email } });
  if (existente) {
    console.log(`[seed] Admin já existe (${email}). Nada a fazer.`);
    return;
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const admin = await prisma.nutricionista.create({
    data: {
      nome: 'Administrador',
      cpf,
      email,
      telefone,
      senha: senhaHash,
      role: 'admin',
    },
  });

  console.log(`[seed] Admin criado: ${admin.email} (senha: ${senha}) — troque a senha após o primeiro login.`);
}

main()
  .catch((e) => {
    console.error('[seed] Erro ao executar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
