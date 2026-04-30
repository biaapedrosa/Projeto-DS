---
status: accepted
date: 2025-04-28
deciders: Grupo 6
---

# ADR-002: Usar JWT para autenticação

## Contexto e Problema

O sistema tem dois tipos de usuário (paciente e nutricionista) com permissões diferentes. Precisamos de um mecanismo de autenticação que funcione bem com a separação frontend/backend que temos, já que o frontend é uma SPA em React que consome a API REST do backend.

## Opções Consideradas

1. JWT (JSON Web Token)
2. Sessões com cookies (express-session)
3. OAuth com provedor externo (Google, etc.)

## Decisão

Vamos usar **JWT**.

Como o frontend e o backend são separados (React rodando na porta 3000 e Express na 3001), usar sessões tradicionais com cookies ia complicar por causa do CORS e da necessidade de manter estado no servidor. O JWT resolve isso porque é stateless — o token vai no header da requisição e o backend só precisa validar a assinatura. OAuth seria interessante mas é complexo demais pro escopo da Sprint 1, e por enquanto não temos necessidade de login social.

## Consequências

* Bom: funciona naturalmente com API REST e frontend SPA separado
* Bom: stateless, não precisa guardar sessão no servidor
* Bom: conseguimos colocar o papel do usuário (paciente/nutricionista) dentro do payload do token
* Ruim: invalidar um token antes de expirar não é trivial (ex: logout forçado)
* Ruim: se o token vazar, não tem como revogar sem implementar uma blacklist
