/**
 * ETAPA 2 — Introduce Exception Hierarchy / Replace Primitive with Object
 * Técnica: "Replace Error Code with Exception" + "Introduce Special Case" (Burchard)
 *
 * SMELLS resolvidos: Primitive Obsession + Inconsistent Error Handling
 *
 * ANTES:  throw new Error('Paciente não encontrado!')
 *         → objeto genérico, sem tipo, sem statusCode
 *         → o controller ADIVINHA o código HTTP baseado no contexto → erros como 400 em vez de 404
 *
 * DEPOIS: throw new NotFoundError('Paciente não encontrado!')
 *         → carrega statusCode = 404 automaticamente
 *         → o handler usa err.statusCode → sempre correto, sem adivinhar
 *
 * Agora updatePaciente/updateNoticia retornam 404 corretamente (bug do Smell 4 corrigido).
 */

const HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// ── Hierarquia de erros nova ──────────────────────────────────────────────────

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
// PACIENTE CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

const getAllPacientes = async (req, res) => {
  try {
    res.status(HTTP.OK).json(db.pacientes);
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

const getPacienteById = async (req, res) => {
  try {
    const paciente = db.pacientes.find(p => p.id === Number(req.params.id));
    if (!paciente) throw new NotFoundError('Paciente não encontrado!'); // ✓ tipo específico
    res.status(HTTP.OK).json(paciente);
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message }); // ✓ usa statusCode do erro
  }
};

const updatePaciente = async (req, res) => {
  try {
    const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) throw new NotFoundError('Paciente não encontrado!'); // ✓
    db.pacientes[idx] = { ...db.pacientes[idx], ...req.body };
    res.status(HTTP.OK).json(db.pacientes[idx]);
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message }); // ✓ agora retorna 404!
  }
};

const removePaciente = async (req, res) => {
  try {
    const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) throw new NotFoundError('Paciente não encontrado!'); // ✓
    db.pacientes.splice(idx, 1);
    res.status(HTTP.NO_CONTENT).send();
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// NOTICIA CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

const getAllNoticias = async (req, res) => {
  try {
    res.status(HTTP.OK).json(db.noticias);
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

const getNoticiaById = async (req, res) => {
  try {
    const noticia = db.noticias.find(n => n.id === Number(req.params.id));
    if (!noticia) throw new NotFoundError('Notícia não encontrada!');    // ✓
    res.status(HTTP.OK).json(noticia);
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

const createNoticia = async (req, res) => {
  try {
    const noticia = { id: db.noticias.length + 1, ...req.body };
    db.noticias.push(noticia);
    res.status(HTTP.CREATED).json(noticia);
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

const updateNoticia = async (req, res) => {
  try {
    const idx = db.noticias.findIndex(n => n.id === Number(req.params.id));
    if (idx === -1) throw new NotFoundError('Notícia não encontrada!');  // ✓
    db.noticias[idx] = { ...db.noticias[idx], ...req.body };
    res.status(HTTP.OK).json(db.noticias[idx]);
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message }); // ✓ agora 404!
  }
};

const removeNoticia = async (req, res) => {
  try {
    const idx = db.noticias.findIndex(n => n.id === Number(req.params.id));
    if (idx === -1) throw new NotFoundError('Notícia não encontrada!');  // ✓
    db.noticias.splice(idx, 1);
    res.status(HTTP.NO_CONTENT).send();
  } catch (err) {
    res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = {
  HTTP, AppError, NotFoundError, ValidationError,
  getAllPacientes, getPacienteById, updatePaciente, removePaciente,
  getAllNoticias, getNoticiaById, createNoticia, updateNoticia, removeNoticia,
  _resetDb,
};
