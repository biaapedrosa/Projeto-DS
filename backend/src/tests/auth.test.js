const jwt = require('jsonwebtoken');
const prisma = require('./helpers/prisma');
const authService = require('../services/authService');

describe('authService.socialLogin', () => {
  it('lança erro quando o email não é informado', async () => {
    await expect(authService.socialLogin({ nome: 'Sem Email' }))
      .rejects.toThrow('Email é obrigatório para login social!');
  });

  it('cria um novo paciente quando o email não existe e retorna um token válido', async () => {
    const token = await authService.socialLogin({ nome: 'Social User', email: 'social.novo@teste.com' });

    expect(typeof token).toBe('string');

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    expect(payload.tipo).toBe('paciente');
    expect(payload.email).toBe('social.novo@teste.com');

    const paciente = await prisma.paciente.findUnique({ where: { email: 'social.novo@teste.com' } });
    expect(paciente).not.toBeNull();
    expect(paciente.nome).toBe('Social User');
  });

  it('reaproveita o paciente existente quando o email já está cadastrado', async () => {
    const existente = await prisma.paciente.create({
      data: { nome: 'Já Existe', email: 'social.existente@teste.com', senha: 'hash' },
    });

    const token = await authService.socialLogin({ nome: 'Outro Nome', email: 'social.existente@teste.com' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    expect(payload.id).toBe(existente.id);
    expect(payload.nome).toBe('Já Existe');

    const total = await prisma.paciente.count({ where: { email: 'social.existente@teste.com' } });
    expect(total).toBe(1);
  });
});
