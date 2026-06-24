// dados mocados para serem utilizados enquanto não tem integração
const b64 = (obj) => btoa(JSON.stringify(obj).replace(/[^\x00-\x7F]/g, ''));
const makeJWT = (payload) => `${b64({ alg: 'none', typ: 'JWT' })}.${b64(payload)}.demo`;

const demoUserFromEmail = (email = '') => {
  const e = String(email).toLowerCase();
  if (e.includes('admin')) {
    return { id: 301, nome: 'Admin Geral', email: email || 'admin@demo.com', tipo: 'nutricionista', role: 'admin' };
  }
  if (e.startsWith('dr') || e.includes('nutri') || e.includes('ana')) {
    return { id: 201, nome: 'Dra. Ana Costa', email: email || 'ana@demo.com', tipo: 'nutricionista', role: 'nutricionista' };
  }
  return { id: 101, nome: 'Maria Silva', email: email || 'joao@teste.com', tipo: 'paciente', role: 'user' };
};

// Gera um token "demo" já decodificável por authService.login.
export const makeDemoToken = (tipo) => {
  const mapa = {
    paciente: 'joao@teste.com',
    nutricionista: 'dr@teste.com',
    admin: 'admin@teste.com',
  };
  return makeJWT(demoUserFromEmail(mapa[tipo] || mapa.paciente));
};

const refeicoesExemplo = [
  {
    id: 1, nome: 'Café da manhã', horario: 7,
    opcoes: [{
      id: 1, nome: 'Opção 1',
      alimentos: [{ id: 1, nome: '2 ovos mexidos' }, { id: 2, nome: '1 fatia de pão integral' }, { id: 3, nome: '1 fruta' }],
    }],
  },
  {
    id: 2, nome: 'Almoço', horario: 12,
    opcoes: [{
      id: 2, nome: 'Opção 1',
      alimentos: [{ id: 4, nome: '120g de frango grelhado' }, { id: 5, nome: '4 colheres de arroz integral' }, { id: 6, nome: 'Salada à vontade' }],
    }],
  },
  {
    id: 3, nome: 'Lanche da tarde', horario: 16,
    opcoes: [{ id: 3, nome: 'Opção 1', alimentos: [{ id: 7, nome: 'Iogurte natural' }, { id: 8, nome: '1 punhado de castanhas' }] }],
  },
];

export const demoPlanos = [
  { id: 1, status: 'ativo', descricao: 'Plano de emagrecimento com foco em redução calórica gradual e manutenção de massa magra.', data_criacao: '2026-06-01', created_at: '2026-06-01', data: '2026-06-01', refeicoes: refeicoesExemplo },
  { id: 2, status: 'inativo', descricao: 'Plano de reeducação alimentar inicial.', data_criacao: '2026-03-10', created_at: '2026-03-10', data: '2026-03-10', refeicoes: refeicoesExemplo },
  { id: 3, status: 'inativo', descricao: 'Plano de manutenção pós-meta.', data_criacao: '2025-12-05', created_at: '2025-12-05', data: '2025-12-05', refeicoes: refeicoesExemplo },
];

export const demoPacientes = [
  { id: 101, nome: 'Maria Silva', email: 'joao@teste.com', telefone_whatsapp: '(81) 99999-0001', cpf: '11111111111', idade: 29, sexo: 'F', ocupacao: 'Designer', objetivo: 'Emagrecimento', vinculo_ufpe: 'Estudante' },
  { id: 102, nome: 'Joao Pereira', email: 'joao.p@demo.com', telefone_whatsapp: '(81) 99999-0002', cpf: '22222222222', idade: 41, sexo: 'M', ocupacao: 'Professor', objetivo: 'Ganho de massa', vinculo_ufpe: 'Servidor' },
  { id: 103, nome: 'Carla Mendes', email: 'carla@demo.com', telefone_whatsapp: '(81) 99999-0003', cpf: '33333333333', idade: 35, sexo: 'F', ocupacao: 'Enfermeira', objetivo: 'Reeducação alimentar', vinculo_ufpe: 'Externo' },
];

export const demoNutricionistas = [
  { id: 201, nome: 'Dra. Ana Costa', email: 'dr@teste.com', crn: 'CRN-6 1234', telefone: '(81) 98888-0001', role: 'nutricionista' },
  { id: 301, nome: 'Admin Geral', email: 'admin@teste.com', crn: 'CRN-6 0001', telefone: '(81) 98888-0002', role: 'admin' },
];

// Consultas / fichas médicas em memória, para a demo sem backend.
export const demoConsultas = [
  {
    id: 1, paciente_id: 101, nutricionista_id: 201, data_consulta: '2026-06-10',
    objetivo_historia: 'Emagrecimento e melhora do sono.',
    antropometria: { pa: '120x80', altura: 1.65, imc: 24.2, pp: 66, exame_fisico: 'Sem alterações.' },
    historia_clinica: { hist_familiar_dm: true, hist_familiar_has: false, hist_familiar_dvc: false, hist_familiar_cancer: false, hist_familiar_outras: '', tem_diagnostico: false, diagnosticos: '' },
    estilo_vida: { bebida_alcoolica: 'Uma_vez_mes', fuma: 'Nunca', atividade_fisica: 'Caminhada 3x/semana', horas_sono: 6, fez_dieta_antes: true },
    funcao_intestinal: { habito_intestinal: 'Diario', agua_dia: 1.5, cor_urina: 'Clara', alergia_intolerancia: 'Lactose', suplementos_medicamentos: 'Vitamina D' },
    paciente: { id: 101, nome: 'Maria Silva' },
  },
];

export function resolveMock(config) {
  const method = (config.method || 'get').toLowerCase();
  const url = (config.url || '').split('?')[0];
  let body = {};
  try { body = config.data ? JSON.parse(config.data) : {}; } catch { /* body não-JSON */ }
  let m;

  // AUTH 
  if (url === '/api/auth/login' && method === 'post') return { token: makeJWT(demoUserFromEmail(body.email)) };
  if (url === '/api/auth/register' && method === 'post') return { ok: true };
  if (url === '/api/auth/social-login' && method === 'post') return { token: makeJWT(demoUserFromEmail(body.email)) };

  // PACIENTES 
  if (url === '/api/pacientes' && method === 'get') return demoPacientes;
  if (url === '/api/pacientes' && method === 'post') return { ...body, id: Date.now() };
  if ((m = url.match(/^\/api\/pacientes\/([^/]+)\/planos$/)) && method === 'get') return demoPlanos;
  if ((m = url.match(/^\/api\/pacientes\/([^/]+)$/))) {
    if (method === 'get') return demoPacientes.find((p) => String(p.id) === m[1]) || demoPacientes[0];
    if (method === 'put') return { ...body, id: m[1] };
    if (method === 'delete') return { ok: true };
  }

  // PLANOS 
  if (url === '/api/planos' && method === 'post') return { ...body, id: Date.now() };
  if ((m = url.match(/^\/api\/planos\/([^/]+)$/))) {
    if (method === 'get') return demoPlanos.find((p) => String(p.id) === m[1]) || demoPlanos[0];
    if (method === 'put') return { ...body, id: m[1] };
    if (method === 'delete') return { ok: true };
  }

  // NUTRICIONISTAS
  if (url === '/api/nutricionistas' && method === 'get') return demoNutricionistas;
  if (url === '/api/nutricionistas' && method === 'post') return { ...body, id: Date.now() };
  if ((m = url.match(/^\/api\/nutricionistas\/([^/]+)$/)) && method === 'delete') return { ok: true };

  // CONSULTAS / FICHAS MÉDICAS
  if (url === '/api/consultas' && method === 'post') {
    const nova = {
      id: Date.now(),
      paciente_id: Number(body.paciente_id),
      data_consulta: body.data_consulta,
      objetivo_historia: body.objetivo_historia,
      antropometria: body.antropometria || null,
      historia_clinica: body.historia_clinica || null,
      estilo_vida: body.estilo_vida || null,
      funcao_intestinal: body.funcao_intestinal || null,
      paciente: demoPacientes.find((p) => String(p.id) === String(body.paciente_id)) || null,
    };
    demoConsultas.unshift(nova);
    return nova;
  }
  if ((m = url.match(/^\/api\/consultas\/paciente\/([^/]+)$/)) && method === 'get') {
    return demoConsultas.filter((c) => String(c.paciente_id) === m[1]);
  }
  if ((m = url.match(/^\/api\/consultas\/([^/]+)$/)) && method === 'get') {
    return demoConsultas.find((c) => String(c.id) === m[1]) || demoConsultas[0];
  }

  return undefined;
}
