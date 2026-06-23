const { Prisma } = require('@prisma/client');

// Nomes amigáveis para campos que aparecem em erros de unicidade do Prisma.
const NOMES_CAMPOS = {
  email: 'e-mail',
  cpf: 'CPF',
  telefone: 'telefone',
  crn: 'CRN',
  cartao_sus: 'cartão SUS',
};

// Detecta mensagens técnicas (ex.: a invocação gigante do Prisma) que não
// devem vazar para a tela do usuário.
const ehMensagemTecnica = (msg) =>
  typeof msg !== 'string' ||
  msg.includes('Invalid `prisma') ||
  msg.includes('prisma.') ||
  msg.length > 200;

// Converte qualquer erro em uma mensagem curta e amigável.
// Erros de negócio lançados pelos services (ex.: "CPF deve conter 11 dígitos.")
// já são curtos e passam direto; só os erros técnicos do banco são traduzidos.
const traduzErro = (err) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': {
        const alvo = err.meta?.target;
        const campo = Array.isArray(alvo) ? alvo[0] : alvo;
        const nome = NOMES_CAMPOS[campo] || campo || 'valor';
        return `Já existe um cadastro com esse ${nome}.`;
      }
      case 'P2000':
        return 'Um dos campos é muito longo. Verifique os dados informados.';
      case 'P2025':
        return 'Registro não encontrado.';
      case 'P2003':
        return 'Operação inválida: há um vínculo com outro registro.';
      default:
        return 'Não foi possível concluir a operação. Verifique os dados e tente novamente.';
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return 'Dados inválidos. Verifique os campos e tente novamente.';
  }

  if (ehMensagemTecnica(err?.message)) {
    return 'Erro ao processar a solicitação. Verifique os dados e tente novamente.';
  }

  return err.message;
};

module.exports = { traduzErro };
