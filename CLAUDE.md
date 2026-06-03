# CLAUDE.md – Clínica de Nutrição

Guia de contexto para o Claude Code trabalhar neste repositório.

---

## Visão Geral

Sistema web para gestão de planos alimentares entre nutricionistas e pacientes.
Desenvolvido na disciplina de **Desenvolvimento de Software – CIn/UFPE 2026.1 (Grupo 6)**.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Front-end | React 18 + Vite + React Router v6 |
| Back-end | Node.js + Express |
| Banco de dados | PostgreSQL |
| Autenticação | JWT (jsonwebtoken + bcryptjs) |
| HTTP Client | Axios |
| Testes (front) | Vitest + Testing Library |

---

## Estrutura do Projeto

```
projeto-ds/
├── backend/
│   └── src/
│       ├── controllers/   # authController, pacienteController, planoController, noticiaController
│       ├── routes/        # authRoutes, pacienteRoutes, planoRoutes, noticiaRoutes
│       ├── models/        # entidades do banco
│       ├── repositories/  # acesso ao banco (pg)
│       ├── services/      # lógica de negócio
│       ├── middlewares/   # autenticação JWT, validação
│       ├── db/            # configuração da conexão PostgreSQL
│       ├── app.js         # configuração do Express
│       └── server.js      # entrada da aplicação
│
└── frontend/
    └── src/
        ├── pages/         # Dashboard, Historico, Home, Institucional, Login, Noticias
        ├── components/    # NavBar, Footer, PlanoCard, SearchBar, DatePicker
        ├── services/      # comunicação com a API via Axios
        ├── context/       # AuthContext (estado global de autenticação)
        ├── hooks/         # hooks customizados
        └── tests/         # testes com Vitest
```

---

## Comandos

### Back-end
```bash
cd backend
npm install
cp .env.example .env   # configure as variáveis abaixo
npm run dev            # inicia com nodemon na porta 3001
```

### Front-end
```bash
cd frontend
npm install
npm start              # inicia Vite na porta 3000
npm test               # roda testes com Vitest (modo watch)
npm run test:run       # roda testes uma vez
npm run test:coverage  # relatório de cobertura
```

---

## Variáveis de Ambiente (backend/.env)

```
PORT=3001
DATABASE_URL=postgresql://usuario:senha@localhost:5432/clinica_nutricao
JWT_SECRET=troque_por_um_segredo_forte
JWT_EXPIRES_IN=7d
```

---

## Convenções

- Commits semânticos: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`, `chore:`
- Branches: `feat/<nome>`, `fix/<nome>`, `docs/<nome>`, `test/<nome>` → sempre a partir de `develop`
- PRs sempre apontam para `develop`; só a Gerente faz merge para `main`
- Arquivos de backend em `camelCase`; componentes React em `PascalCase`
- Não commitar `.env`

---

## Rotas da API

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| POST | `/api/auth/register` | Cadastro de paciente | Público |
| POST | `/api/auth/login` | Login (retorna JWT) | Público |
| GET | `/api/pacientes/:id` | Dados do paciente | Autenticado |
| PUT | `/api/pacientes/:id` | Atualiza paciente | Autenticado |
| GET | `/api/planos/:id` | Retorna plano | Autenticado |
| POST | `/api/planos` | Cria plano | Nutricionista |
| PUT | `/api/planos/:id` | Edita plano | Nutricionista |
| DELETE | `/api/planos/:id` | Remove plano | Nutricionista |
| GET | `/api/noticias` | Lista notícias | Público |
| POST | `/api/noticias` | Cria notícia | Nutricionista/Admin |

---

## Time

| Membro | Papel |
|--------|-------|
| Beatriz Pedrosa | Gerente |
| Eduardo Neves | Product Owner |
| Beatriz Pandolfi | Desenvolvedor |
| João Luís de Siqueira | Desenvolvedor |
| João Antônio Lins | Desenvolvedor |
| Marina Cabral | Desenvolvedor |
| Luísa Lócio | Desenvolvedor |
| Caio Agrelli | Desenvolvedor |
