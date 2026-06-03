# Contribuindo com o Projeto

Obrigado por contribuir com o sistema da **Clínica de Nutrição – Grupo 6 / UFPE**!
Este guia descreve o fluxo de trabalho esperado para todos os membros.

---

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Fluxo de Branches](#fluxo-de-branches)
- [Commits Semânticos](#commits-semânticos)
- [Abrindo um Pull Request](#abrindo-um-pull-request)
- [Padrões de Código](#padrões-de-código)
- [Rodando os Testes](#rodando-os-testes)

---

## Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- Git configurado com seu nome e e-mail

---

## Fluxo de Branches

```
main
 └── develop          ← integração contínua
      ├── feat/<nome>  ← nova funcionalidade
      ├── fix/<nome>   ← correção de bug
      ├── docs/<nome>  ← documentação
      └── test/<nome>  ← testes
```

1. Crie sua branch a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/minha-funcionalidade
   ```

2. Faça seus commits na branch criada.

3. Abra um Pull Request de `feat/minha-funcionalidade` → `develop`.

4. Apenas a Gerente faz o merge de `develop` → `main`.

---

## Commits Semânticos

Use o padrão `tipo: descrição curta no imperativo`.

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Alterações em documentação |
| `test` | Adição ou ajuste de testes |
| `refactor` | Refatoração sem mudança de comportamento |
| `style` | Formatação, espaçamento (sem lógica) |
| `chore` | Tarefas de build, dependências |

**Exemplos:**
```
feat: adiciona modal de cadastro de paciente
fix: corrige redirecionamento após login
docs: atualiza instruções de setup no README
test: adiciona testes para planoAlimentarService
```

---

## Abrindo um Pull Request

1. Certifique-se de que sua branch está atualizada com `develop`:
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. Abra o PR no GitHub apontando para `develop`.

3. Preencha o título seguindo o padrão de commit semântico.

4. Descreva no corpo do PR:
   - O que foi feito
   - Como testar
   - Prints ou evidências (quando aplicável)

5. Solicite revisão de pelo menos um outro membro do grupo.

6. Não faça merge do próprio PR sem aprovação.

---

## Padrões de Código

### Back-end (Node.js + Express)

- Arquivos em `camelCase` (ex: `planoController.js`)
- Rotas RESTful seguindo o padrão já existente em `src/routes/`
- Validações no middleware antes de chegar ao controller
- Não commitar arquivos `.env`

### Front-end (React.js)

- Componentes em `PascalCase` (ex: `PlanoCard.jsx`)
- Páginas em `src/pages/`, componentes reutilizáveis em `src/components/`
- Comunicação com a API centralizada em `src/services/`
- Estado global via `AuthContext` em `src/context/`

---

## Rodando os Testes

### Back-end
```bash
cd backend
npm test
```

### Front-end
```bash
cd frontend
npm test
```

Execute os testes antes de abrir um PR. PRs com testes quebrados não serão aprovados.

---

Em caso de dúvidas, fale com a Gerente do projeto **Beatriz Pedrosa**.
