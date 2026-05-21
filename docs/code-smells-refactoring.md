# Code Smells & Refactoring — Clínica de Nutrição

> Baseado no livro **Refactoring JavaScript** — Evan Burchard  
> Atividade: identificar code smells e aplicar 5 refatorações progressivas com testes verdes a cada passo.

---

## Código analisado

Os smells foram identificados nos arquivos:

- `backend/src/controllers/pacienteController.js`
- `backend/src/controllers/noticiaController.js`
- `backend/src/services/pacienteService.js`
- `backend/src/services/noticiaService.js`

O exercício de refactoring completo está em `refactoring-exercise/` com código auto-contido e testes Jest.

---

## Smells Identificados

### Smell 1 — Magic Numbers

**Onde:** Todos os controllers (`pacienteController.js`, `noticiaController.js`)

**Descrição (Burchard):** Literais numéricos espalhados pelo código sem nenhuma indicação do que representam. O leitor precisa conhecer a especificação HTTP de cabeça para entender o código.

**Código problemático:**
```js
res.status(200).json(paciente);
res.status(404).json({ error: err.message });
res.status(204).send();
res.status(400).json({ error: err.message });
res.status(201).json(noticia);
```

**Problema:** O número `404` não diz nada por si só. E se precisar mudar o padrão de resposta, você altera em 9 lugares diferentes.

---

### Smell 2 — Duplicated Code

**Onde:** Todos os controllers — bloco `try/catch` repetido 9 vezes

**Descrição (Burchard):** O mesmo trecho de código aparece em múltiplos lugares. Se a lógica mudar (ex: adicionar logging de erros), é necessário alterar todos os pontos.

**Código problemático:**
```js
const getById = async (req, res) => {
  try {
    const paciente = await pacienteService.getById(req.params.id);
    res.status(200).json(paciente);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
// → estrutura repetida mais 8 vezes
```

**Problema:** Shotgun Surgery — uma mudança na estratégia de tratamento de erros exige editar 9 funções.

---

### Smell 3 — Primitive Obsession

**Onde:** Services (`pacienteService.js`, `noticiaService.js`)

**Descrição (Burchard):** Usar tipos primitivos (string, Error genérico) onde um objeto especializado seria mais adequado. O `Error` genérico não carrega informação sobre o tipo do erro.

**Código problemático:**
```js
if (!paciente) throw new Error('Paciente não encontrado!');
```

**Problema:** O controller não consegue distinguir entre um erro de "não encontrado" (404) e um erro de validação (400). Ele adivinha baseado no contexto, o que leva ao Smell 4.

---

### Smell 4 — Inconsistent Error Handling

**Onde:** `pacienteController.js` e `noticiaController.js`

**Descrição (Burchard):** A mesma situação (recurso não encontrado) produz respostas HTTP diferentes dependendo do método chamado.

**Código problemático:**
```js
// getPacienteById — retorna 404 para "não encontrado"
} catch (err) {
  res.status(404).json({ error: err.message });
}

// updatePaciente — retorna 400 para O MESMO tipo de erro
} catch (err) {
  res.status(400).json({ error: err.message }); // BUG: deveria ser 404
}
```

**Problema:** Comportamento imprevisível para quem consome a API. A causa raiz é o Smell 3 — como o `Error` é genérico, o controller usa o status "errado" em alguns contextos.

---

### Smell 5 — Code Clone

**Onde:** `pacienteController.js` vs `noticiaController.js`

**Descrição (Burchard):** Dois módulos com estrutura quase idêntica — só mudam os nomes das variáveis e o service chamado. É um clone horizontal entre os dois controllers.

**Código problemático:**
```js
// noticiaController.js          |  pacienteController.js
const noticias = await           |  const pacientes = await
  noticiaService.getAll();       |    pacienteService.getAll();
res.status(200).json(noticias);  |  res.status(200).json(pacientes);
```

**Problema:** Toda nova feature (ex: paginação, cache) precisa ser implementada nos dois controllers. Adicionar um terceiro recurso (nutricionistas) cria mais um clone.

---

## As 5 Refatorações

> Cada etapa tem testes Jest que ficam **verdes antes e depois** da mudança.  
> Arquivos em `refactoring-exercise/src/` e `refactoring-exercise/tests/`.

---

### Etapa 1 — Extract Constant

**Smell resolvido:** Magic Numbers  
**Técnica (Burchard):** *Replace Magic Number with Symbolic Constant*  
**Arquivo de exercício:** `src/step1.js` | **Testes:** `tests/step1.test.js`  
**Arquivo real modificado:** `backend/src/constants/httpStatus.js` (criado), controllers atualizados

**Antes:**
```js
res.status(200).json(paciente);
res.status(404).json({ error: err.message });
```

**Depois:**
```js
const HTTP = { OK: 200, NOT_FOUND: 404, ... };

res.status(HTTP.OK).json(paciente);
res.status(HTTP.NOT_FOUND).json({ error: err.message });
```

**Por que melhora:** O nome da constante documenta a intenção. Mudar um padrão de status exige alterar 1 linha, não 9.

---

### Etapa 2 — Introduce Exception Hierarchy

**Smell resolvido:** Primitive Obsession + Inconsistent Error Handling  
**Técnica (Burchard):** *Replace Error Code with Exception* / *Introduce Special Case*  
**Arquivo de exercício:** `src/step2.js` | **Testes:** `tests/step2.test.js`  
**Arquivo real modificado:** `backend/src/errors/AppError.js` (criado), services atualizados

**Antes:**
```js
throw new Error('Paciente não encontrado!');
// controller adivinha: 404? 400?
```

**Depois:**
```js
class NotFoundError extends AppError {
  constructor(msg) { super(msg, 404); }
}

throw new NotFoundError('Paciente não encontrado!');
// controller usa err.statusCode → sempre correto
```

**Por que melhora:** O erro carrega seu próprio status. O controller não precisa mais adivinhar — o bug do Smell 4 é corrigido automaticamente.

---

### Etapa 3 — Extract Function: asyncHandler

**Smell resolvido:** Duplicated Code (try/catch repetido 9×)  
**Técnica (Burchard):** *Extract Function*  
**Arquivo de exercício:** `src/step3.js` | **Testes:** `tests/step3.test.js`  
**Arquivo real modificado:** `backend/src/middlewares/asyncHandler.js` (criado), controllers refatorados

**Antes (9× repetido):**
```js
const handler = async (req, res) => {
  try {
    // lógica
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
```

**Depois:**
```js
const asyncHandler = (fn) => async (req, res) => {
  try { await fn(req, res); }
  catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const handler = asyncHandler(async (req, res) => {
  // só a lógica
});
```

**Por que melhora:** Um único ponto para toda a lógica de tratamento de erros. Logging, métricas, rastreamento — tudo em um só lugar.

---

### Etapa 4 — Extract Function: findOrFail

**Smell resolvido:** Duplicated Code — padrão `find + if (!x) throw` repetido 6×  
**Técnica (Burchard):** *Extract Function*  
**Arquivo de exercício:** `src/step4.js` | **Testes:** `tests/step4.test.js`

**Antes (6× repetido):**
```js
const paciente = db.pacientes.find(p => p.id === Number(req.params.id));
if (!paciente) throw new NotFoundError('Paciente não encontrado!');
```

**Depois:**
```js
const findOrFail = (collection, id, message) => {
  const item = collection.find(x => x.id === Number(id));
  if (!item) throw new NotFoundError(message);
  return item;
};

const paciente = findOrFail(db.pacientes, req.params.id, 'Paciente não encontrado!');
```

**Por que melhora:** Os handlers ficam declarativos. O código diz *o que* faz, não *como* faz.

---

### Etapa 5 — Extract Function: createCrudController

**Smell resolvido:** Code Clone — `pacienteController` ≅ `noticiaController`  
**Técnica (Burchard):** *Replace Duplicate Code with Factory*  
**Arquivo de exercício:** `src/step5.js` | **Testes:** `tests/step5.test.js`

**Antes (~80 linhas duplicadas entre os dois controllers):**
```js
// pacienteController.js
const getAll = asyncHandler(async (req, res) => {
  res.status(HTTP.OK).json(db.pacientes);
});

// noticiaController.js — cópia
const getAll = asyncHandler(async (req, res) => {
  res.status(HTTP.OK).json(db.noticias);
});
```

**Depois (factory gera os handlers):**
```js
const createCrudController = ({ getCollection, notFoundMessage }) => ({
  getAll: asyncHandler(async (req, res) => {
    res.status(HTTP.OK).json(getCollection());
  }),
  // ...
});

const pacienteController = createCrudController({
  getCollection: () => db.pacientes,
  notFoundMessage: 'Paciente não encontrado!',
});

const noticiaController = createCrudController({
  getCollection: () => db.noticias,
  notFoundMessage: 'Notícia não encontrada!',
});
```

**Por que melhora:** Adicionar um recurso novo = 3 linhas. Features (paginação, cache) implementadas 1 vez valem para todos.

---

## Resumo

| # | Smell | Onde no projeto | Técnica aplicada | Arquivo criado/modificado |
|---|-------|-----------------|------------------|--------------------------|
| 1 | Magic Numbers | controllers | Extract Constant | `constants/httpStatus.js` |
| 2 | Primitive Obsession | services | Exception Hierarchy | `errors/AppError.js` |
| 3 | Duplicated Code (try/catch) | controllers | Extract Function | `middlewares/asyncHandler.js` |
| 4 | Duplicated Code (find+throw) | controllers | Extract Function | `refactoring-exercise` |
| 5 | Code Clone | controllers | Factory Function | `refactoring-exercise` |

---

## Resultados dos testes

```
Test Suites: 6 passed, 6 total
Tests:       86 passed, 86 total
```

Todos os testes passam em todas as etapas, confirmando que o comportamento externo foi preservado durante cada refatoração.

---

## Como rodar os testes

```bash
cd refactoring-exercise
npm install
npm test
```
