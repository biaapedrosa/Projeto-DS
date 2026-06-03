const prisma = require('./helpers/prisma');

describe('Paciente', () => {
  it('cria um paciente no banco', async () => {
    const paciente = await prisma.paciente.create({
      data: {
        nome: 'João Teste',
        email: 'joao@teste.com',
        senha: 'hash_qualquer',
      },
    });

    expect(paciente.id).toBeDefined();
    expect(paciente.nome).toBe('João Teste');
    expect(paciente.email).toBe('joao@teste.com');
  });

  it('não permite dois pacientes com o mesmo email', async () => {
    await prisma.paciente.create({
      data: { nome: 'A', email: 'mesmo@email.com', senha: '123' },
    });

    await expect(
      prisma.paciente.create({
        data: { nome: 'B', email: 'mesmo@email.com', senha: '456' },
      })
    ).rejects.toThrow();
  });
});
