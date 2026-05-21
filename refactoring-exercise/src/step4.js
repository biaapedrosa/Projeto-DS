/**
 * ETAPA 4 — Extract Function: findOrFail
 * Técnica: "Extract Function" (Burchard cap. 6)
 *
 * SMELL resolvido: Duplicated Code — o padrão "find + if (!x) throw" aparecia 6 vezes
 *
 * ANTES (repetido 6×):
 *   const paciente = db.pacientes.find(p => p.id === Number(req.params.id));
 *   if (!paciente) throw new NotFoundError('Paciente não encontrado!');
 *
 *   const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
 *   if (idx === -1) throw new NotFoundError('Paciente não encontrado!');
 *
 * DEPOIS:
 *   const paciente = findOrFail(db.pacientes, req.params.id, 'Paciente não encontrado!');
 *   const [paciente, idx] = findWithIndexOrFail(db.pacientes, req.params.id, 'Paciente não encontrado!');
 *
 * Os handlers ficam menores e mais declarativos.
 * O código agora diz O QUE faz, não COMO faz.
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

const asyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    const status = err.statusCode || HTTP.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

// ── Utilitários novos ─────────────────────────────────────────────────────────

/**
 * Busca item por id na coleção. Lança NotFoundError se não encontrar.
 * @returns {object} o item encontrado
 */
const findOrFail = (collection, id, message) => {
  const item = collection.find(x => x.id === Number(id));
  if (!item) throw new NotFoundError(message);
  return item;
};

/**
 * Busca item por id retornando o item E seu índice.
 * Lança NotFoundError se não encontrar.
 * @returns {[object, number]} [item, índice]
 */
const findWithIndexOrFail = (collection, id, message) => {
  const idx = collection.findIndex(x => x.id === Number(id));
  if (idx === -1) throw new NotFoundError(message);
  return [collection[idx], idx];
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
// PACIENTE CONTROLLERS — sem find/findIndex/if manual ✓
// ─────────────────────────────────────────────────────────────────────────────

const getAllPacientes = asyncHandler(async (req, res) => {
  res.status(HTTP.OK).json(db.pacientes);
});

const getPacienteById = asyncHandler(async (req, res) => {
  const paciente = findOrFail(db.pacientes, req.params.id, 'Paciente não encontrado!'); // ✓
  res.status(HTTP.OK).json(paciente);
});

const updatePaciente = asyncHandler(async (req, res) => {
  const [, idx] = findWithIndexOrFail(db.pacientes, req.params.id, 'Paciente não encontrado!'); // ✓
  db.pacientes[idx] = { ...db.pacientes[idx], ...req.body };
  res.status(HTTP.OK).json(db.pacientes[idx]);
});

const removePaciente = asyncHandler(async (req, res) => {
  const [, idx] = findWithIndexOrFail(db.pacientes, req.params.id, 'Paciente não encontrado!'); // ✓
  db.pacientes.splice(idx, 1);
  res.status(HTTP.NO_CONTENT).send();
});

// ─────────────────────────────────────────────────────────────────────────────
// NOTICIA CONTROLLERS — sem find/findIndex/if manual ✓
// ─────────────────────────────────────────────────────────────────────────────

const getAllNoticias = asyncHandler(async (req, res) => {
  res.status(HTTP.OK).json(db.noticias);
});

const getNoticiaById = asyncHandler(async (req, res) => {
  const noticia = findOrFail(db.noticias, req.params.id, 'Notícia não encontrada!'); // ✓
  res.status(HTTP.OK).json(noticia);
});

const createNoticia = asyncHandler(async (req, res) => {
  const noticia = { id: db.noticias.length + 1, ...req.body };
  db.noticias.push(noticia);
  res.status(HTTP.CREATED).json(noticia);
});

const updateNoticia = asyncHandler(async (req, res) => {
  const [, idx] = findWithIndexOrFail(db.noticias, req.params.id, 'Notícia não encontrada!'); // ✓
  db.noticias[idx] = { ...db.noticias[idx], ...req.body };
  res.status(HTTP.OK).json(db.noticias[idx]);
});

const removeNoticia = asyncHandler(async (req, res) => {
  const [, idx] = findWithIndexOrFail(db.noticias, req.params.id, 'Notícia não encontrada!'); // ✓
  db.noticias.splice(idx, 1);
  res.status(HTTP.NO_CONTENT).send();
});

module.exports = {
  HTTP, AppError, NotFoundError, ValidationError, asyncHandler,
  findOrFail, findWithIndexOrFail,
  getAllPacientes, getPacienteById, updatePaciente, removePaciente,
  getAllNoticias, getNoticiaById, createNoticia, updateNoticia, removeNoticia,
  _resetDb,
};
