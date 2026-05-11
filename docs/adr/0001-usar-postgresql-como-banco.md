---
status: accepted
date: 2025-04-28
deciders: Grupo 6
---

# ADR-001: Usar PostgreSQL como banco de dados

## Contexto e Problema

Precisamos escolher o banco de dados do sistema. O projeto envolve dados relacionais (pacientes, nutricionistas, planos alimentares) com relacionamentos claros entre eles, então temos que decidir entre um banco relacional e um NoSQL.

## Opções Consideradas

1. PostgreSQL
2. MySQL
3. MongoDB

## Decisão

Vamos usar **PostgreSQL**.

O modelo de dados do sistema é bem relacional — um paciente tem vários planos, cada plano pertence a um nutricionista, etc. Então faz mais sentido usar um banco relacional. Entre PostgreSQL e MySQL, escolhemos o Postgres porque alguns membros da equipe já usaram em outras disciplinas e ele tem melhor suporte a tipos de dados como JSON (caso precise no futuro). MongoDB não faria sentido porque nossos dados são estruturados e precisamos de integridade referencial (FK entre tabelas).

## Consequências

* Bom: garante integridade dos dados com chaves estrangeiras e constraints
* Bom: parte da equipe já tem experiência com Postgres
* Bom: boa documentação e funciona bem com Node.js (via pg ou Sequelize)
* Ruim: precisa configurar o banco localmente em cada máquina do time, o que pode dar trabalho no início
