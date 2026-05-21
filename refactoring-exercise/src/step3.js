/**
 * ETAPA 3 — Extract Function: asyncHandler
 * Técnica: "Extract Function" (Fowler / Burchard cap. 6)
 *
 * SMELL resolvido: Duplicated Code — o bloco try/catch aparecia 9 vezes
 *
 * ANTES (repetido 9×):
 *   const handler = async (req, res) => {
 *     try { ... }
 *     catch (err) { res.status(err.statusCode || 500).json({ error: err.message }); }
 *   };
 *
 * DEPOIS:
 *   const handler = asyncHandler(async (req, res) => { ... });
 *
 * O `asyncHandler` é um Higher-Order Function: recebe uma função e devolve
 * outra que envolve a original com o try/catch centralizado.
 * Se precisar adicionar logging, métricas ou monitoramento de erros,
 * você altera em 1 único lugar.
 */

const HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class NotFoundError extends AppError {
  constructor(message) { super(message, HTTP.NOT_FOUND); }
}

class ValidationError extends AppError {
  constructor(message) { super(message, HTTP.BAD_REQUEST); }
}

// ── asyncHandler: nova abstração ──────────────────────────────────────────────

const asyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    const status = err.statusCode || HTTP.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

// ── DB ────────────────────────────────────────────────────────────────────────
const INITIAL_DATA = () => ({
  pacientes: [
    { id: 1, nome: 'João Silva',   email: 'joao@email.com' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com' },
  ],
  noticias: [
    { id: 1, titulo: 'Dieta mediterrânea', conteudo: 'Benefícios da dieta.' },
  ],
});

let db = INITIAL_DATA();
const _resetDb = () => { db = INITIAL_DATA(); };

// ─────────────────────────────────────────────────────────────────────────────
// PACIENTE CONTROLLERS — sem try/catch! ✓
// ─────────────────────────────────────────────────────────────────────────────

const getAllPacientes = asyncHandler(async (req, res) => {
  res.status(HTTP.OK).json(db.pacientes);
});

const getPacienteById = asyncHandler(async (req, res) => {
  const paciente = db.pacientes.find(p => p.id === Number(req.params.id));
  if (!paciente) throw new NotFoundError('Paciente não encontrado!');
  res.status(HTTP.OK).json(paciente);
});

const updatePaciente = asyncHandler(async (req, res) => {
  const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) throw new NotFoundError('Paciente não encontrado!');
  db.pacientes[idx] = { ...db.pacientes[idx], ...req.body };
  res.status(HTTP.OK).json(db.pacientes[idx]);
});

const removePaciente = asyncHandler(async (req, res) => {
  const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) throw new NotFoundError('Paciente não encontrado!');
  db.pacientes.splice(idx, 1);
  res.status(HTTP.NO_CONTENT).send();
});

// ─────────────────────────────────────────────────────────────────────────────
// NOTICIA CONTROLLERS — sem try/catch! ✓
// ─────────────────────────────────────────────────────────────────────────────

const getAllNoticias = asyncHandler(async (req, res) => {
  res.status(HTTP.OK).json(db.noticias);
});

const getNoticiaById = asyncHandler(async (req, res) => {
  const noticia = db.noticias.find(n => n.id === Number(req.params.id));
  if (!noticia) throw new NotFoundError('Notícia não encontrada!');
  res.status(HTTP.OK).json(noticia);
});

const createNoticia = asyncHandler(async (req, res) => {
  const noticia = { id: db.noticias.length + 1, ...req.body };
  db.noticias.push(noticia);
  res.status(HTTP.CREATED).json(noticia);
});

const updateNoticia = asyncHandler(async (req, res) => {
  const idx = db.noticias.findIndex(n => n.id === Number(req.params.id));
  if (idx === -1) throw new NotFoundError('Notícia não encontrada!');
  db.noticias[idx] = { ...db.noticias[idx], ...req.body };
  res.status(HTTP.OK).json(db.noticias[idx]);
});

const removeNoticia = asyncHandler(async (req, res) => {
  const idx = db.noticias.findIndex(n => n.id === Number(req.params.id));
  if (idx === -1) throw new NotFoundError('Notícia não encontrada!');
  db.noticias.splice(idx, 1);
  res.status(HTTP.NO_CONTENT).send();
});

module.exports = {
  HTTP, AppError, NotFoundError, ValidationError, asyncHandler,
  getAllPacientes, getPacienteById, updatePaciente, removePaciente,
  getAllNoticias, getNoticiaById, createNoticia, updateNoticia, removeNoticia,
  _resetDb,
};
