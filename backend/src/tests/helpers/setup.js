const prisma = require('./prisma');

beforeEach(async () => {
  await prisma.$transaction([
    prisma.alimento.deleteMany(),
    prisma.opcao.deleteMany(),
    prisma.refeicao.deleteMany(),
    prisma.planoRefeicao.deleteMany(),
    prisma.exameBioquimico.deleteMany(),
    prisma.antropometria.deleteMany(),
    prisma.historiaClinica.deleteMany(),
    prisma.estiloVida.deleteMany(),
    prisma.funcaoIntestinalUrinaria.deleteMany(),
    prisma.consulta.deleteMany(),
    prisma.noticia.deleteMany(),
    prisma.paciente.deleteMany(),
    prisma.nutricionista.deleteMany(),
  ]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
