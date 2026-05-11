# Clínica de Nutrição – Sistema Web

**Centro de Informática – UFPE | Sistemas de Informação 2026.1 | Grupo 6**

| Integrante | Papel |
|---|---|
| Beatriz Pedrosa | Gerente |
| Eduardo Neves | Product Owner |
| Beatriz Pandolfi | Desenvolvedor |
| João Luís  de Siqueira | Desenvolvedor |
| João Antônio Lins | Desenvolvedor |
| Marina Cabral | Desenvolvedor |
| Luísa Lócio | Desenvolvedor |
| Caio Agrelli | Desenvolvedor |

---

## Sobre o Projeto

Sistema web para automatizar o planejamento alimentar e facilitar a comunicação entre nutricionistas e pacientes. Permite que nutricionistas criem e editem planos alimentares online, e que pacientes visualizem seus planos e histórico de acompanhamento.

---

## Arquitetura

O projeto segue a arquitetura **MVC em 3 camadas**:

```
┌─────────────────────────────────┐
│  Apresentação  │  React.js       │  Renderiza UI, consome API REST
├─────────────────────────────────┤
│  Negócio       │  Node + Express │  Lógica, validações, autenticação
├─────────────────────────────────┤
│  Dados         │  PostgreSQL     │  Persistência das entidades
└─────────────────────────────────┘
```

---

## Stack

| Camada | Tecnologia |
|---|---|
| Front-end | React.js |
| Back-end | Node.js + Express.js |
| Banco de dados | PostgreSQL |
| Autenticação | JWT |

---

## Estrutura de Pastas

```
Projeto-DS/
├── frontend/
│   └── src/
│       ├── components/     # Componentes reutilizáveis (NavBar, PlanoCard…)
│       ├── pages/          # Login, Dashboard, Historico, Institucional, Noticias
│       ├── services/       # Comunicação com a API (authService.js, planoService.js)
│       └── context/        # Estado global (AuthContext)
│
└── backend/
    └── src/
        ├── routes/         # authRoutes.js, pacienteRoutes.js, planoRoutes.js, noticiaRoutes.js
        ├── controllers/    # authController.js, pacienteController.js, planoController.js
        ├── models/         # Paciente.js, PlanoAlimentar.js, Nutricionista.js
        ├── middlewares/    # auth.js (JWT), validation.js
        └── services/       # planoAlimentarService.js, emailService.js
```

---

## API REST

### Autenticação `/api/auth`
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastro de novo paciente |
| POST | `/api/auth/login` | Login (retorna JWT) |
| POST | `/api/auth/logout` | Logout e invalidação do token |

### Pacientes `/api/pacientes`
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/pacientes/:id` | Retorna dados do paciente |
| PUT | `/api/pacientes/:id` | Atualiza dados do paciente |
| GET | `/api/pacientes/:id/planos` | Histórico de planos do paciente |

### Planos Alimentares `/api/planos`
| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| GET | `/api/planos/:id` | Retorna um plano específico | Autenticado |
| POST | `/api/planos` | Cria novo plano | Nutricionista |
| PUT | `/api/planos/:id` | Edita plano existente | Nutricionista |
| DELETE | `/api/planos/:id` | Remove um plano | Nutricionista |

### Notícias `/api/noticias`
| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| GET | `/api/noticias` | Lista todas as notícias | Público |
| GET | `/api/noticias/:id` | Retorna uma notícia | Público |
| POST | `/api/noticias` | Cria nova notícia | Nutricionista/Admin |
| PUT | `/api/noticias/:id` | Edita notícia | Nutricionista/Admin |

---

## Modelo de Dados

```
Paciente          PlanoAlimentar         Nutricionista
─────────         ──────────────         ─────────────
id                id                     id
nome              paciente_id (FK)       nome
email             nutricionista_id (FK)  email
senha             descricao              senha
dados_pessoais    data_criacao
                  status

Noticia
───────
id
titulo
conteudo
data_publicacao
```

---

## Sprint 1 – Escopo

- [ ] Configuração do projeto (estrutura, dependências, ambiente)
- [ ] Autenticação: cadastro e login de pacientes
- [ ] CRUD de planos alimentares no back-end
- [ ] Tela de visualização do plano alimentar no front-end
- [ ] Configuração do banco e migrations iniciais (Paciente, Nutricionista, PlanoAlimentar)

---

## Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+

### Back-end
```bash
cd backend
npm install
cp .env.example .env   # configure DATABASE_URL e JWT_SECRET
npm run dev
```

### Front-end
```bash
cd frontend
npm install
npm start
```

O front-end estará disponível em `http://localhost:3000` e a API em `http://localhost:3001`.
