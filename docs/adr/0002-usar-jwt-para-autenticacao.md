---
status: accepted
date: 2025-04-28
deciders: Grupo 6
---

# ADR-003: Separar frontend e backend em projetos distintos

## Contexto e Problema

Precisamos definir como organizar o código do sistema. A equipe tem 8 pessoas e vamos trabalhar em paralelo no frontend e no backend durante as sprints. Temos que decidir se o frontend fica junto com o backend (server-side rendering) ou se separamos em dois projetos independentes que se comunicam por API.

## Opções Consideradas

1. Frontend e backend separados (React SPA + API REST em Express)
2. Server-side rendering com EJS/Handlebars no Express
3. Next.js (fullstack com SSR)

## Decisão

Vamos **separar frontend e backend em dois projetos** dentro do mesmo repositório (`/frontend` e `/backend`), com o React consumindo a API REST do Express.

Essa separação permite que a equipe de front trabalhe nos componentes e telas sem depender do pessoal do back, e vice-versa. A comunicação entre os dois é feita via API REST com JSON. Usar SSR com templates (EJS) ia misturar responsabilidades e dificultar a divisão de trabalho. Next.js seria uma boa alternativa, mas a equipe tem mais familiaridade com React puro + Express, e não precisamos de SSR por enquanto.

## Consequências

* Bom: permite desenvolvimento em paralelo — front e back podem evoluir independente
* Bom: contrato claro entre as camadas (API REST documentada)
* Bom: a equipe já tem experiência com React e Express separados
* Ruim: precisa lidar com CORS entre as portas 3000 e 3001 durante o desenvolvimento
* Ruim: dois `npm install` e dois processos rodando pra desenvolver localmente
