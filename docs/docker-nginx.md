# Configuração Docker e Nginx — Clínica de Nutrição

## Objetivo

Esta configuração foi adicionada para preparar o projeto da Clínica de Nutrição para execução em ambiente Docker, seguindo o padrão solicitado para hospedagem dos projetos em:

```text
clinicasdigitais.cin.ufpe.br/nutricao
```

Localmente, a aplicação foi configurada para rodar em:

```text
http://localhost/nutricao/
```

## Estrutura configurada

O projeto foi dockerizado utilizando `docker compose`, com os seguintes serviços:

* `db`: banco de dados PostgreSQL;
* `backend`: API Node.js/Express com Prisma;
* `frontend`: aplicação React/Vite;
* `nginx`: proxy reverso responsável por expor a aplicação na rota `/nutricao/`.

## Banco de dados

O banco utilizado pelo projeto é PostgreSQL. No `docker-compose.yml`, foi configurada a imagem:

```yml
image: postgres:16-alpine
```

O banco criado para a aplicação é:

```text
clinica_nutricao
```

A conexão do backend com o banco ocorre internamente pela rede Docker, usando o serviço `db` como host:

```text
postgresql://postgres:postgres@db:5432/clinica_nutricao
```

## Backend

O backend foi configurado com um `Dockerfile` próprio dentro da pasta `backend`.

Foi utilizada a imagem:

```dockerfile
FROM node:22-alpine
```

Também foi adicionada a instalação do OpenSSL:

```dockerfile
RUN apk add --no-cache openssl
```

Essa alteração foi necessária para corrigir problemas relacionados ao Prisma dentro do container.

Durante a inicialização do backend, são executados os seguintes passos:

```bash
npx prisma db push --skip-generate
node prisma/seed.js
node src/server.js
```

Com isso, o Prisma sincroniza o schema com o banco, o seed cria o usuário administrador inicial e a API sobe na porta `3001`.

## Frontend

O frontend foi ajustado para funcionar corretamente dentro da rota `/nutricao/`, já que a aplicação não será servida diretamente na raiz do domínio.

No ambiente do frontend, foi configurado:

```yml
VITE_BASE: /nutricao/
```

Também foi ajustado o `vite.config.js` para considerar essa base.

Além disso, foi corrigido o carregamento da imagem da home. Antes, a imagem era chamada com caminho absoluto:

```jsx
src="/tela-inicio.jpg"
```

Esse caminho quebrava quando a aplicação era servida em `/nutricao/`. Por isso, foi alterado para usar a base do Vite:

```jsx
src={`${import.meta.env.BASE_URL}tela-inicio.jpg`}
```

## Nginx

Foi adicionada a pasta `nginx/`, contendo:

```text
nginx/Dockerfile
nginx/default.conf
```

O nginx funciona como proxy reverso, expondo a aplicação no caminho:

```text
/nutricao/
```

Essa configuração é importante porque o professor solicitou que os projetos sejam acessados no formato:

```text
clinicasdigitais.cin.ufpe.br/nutricao
```

## Ajustes de navegação

Além da configuração do ambiente, também foram feitos pequenos ajustes de navegação no frontend:

* adicionado botão “Voltar para início” no painel administrativo;
* adicionado botão “Voltar para painel” na página “Meus Pacientes”.

Esses ajustes facilitam o fluxo de navegação entre as telas principais da aplicação.

## Como rodar o projeto

Na raiz do projeto, executar:

```bash
docker compose up --build
```

Após os containers subirem, acessar:

```text
http://localhost/nutricao/
```

## Login de teste

O seed cria um usuário administrador inicial:

```text
E-mail: admin@clinica.com
Senha: admin123
```

## Testes realizados

Foram testados os seguintes pontos:

* subida do banco PostgreSQL;
* subida do backend na porta `3001`;
* execução do Prisma dentro do container;
* criação do usuário administrador via seed;
* subida do frontend com Vite;
* acesso ao sistema pela rota `/nutricao/`;
* acesso via nginx em `http://localhost/nutricao/`;
* carregamento correto da imagem da home;
* login do administrador;
* navegação para o painel administrativo;
* botão “Voltar para início” no painel;
* página “Meus Pacientes”;
* botão “Voltar para painel”.

## Arquivos alterados/adicionados

Arquivos modificados:

```text
backend/Dockerfile
docker-compose.yml
frontend/package-lock.json
frontend/src/pages/Admin/index.jsx
frontend/src/pages/Home/sections/Hero.jsx
frontend/src/pages/Nutricionista/ListaPacientes/index.jsx
frontend/vite.config.js
```

Arquivos adicionados:

```text
nginx/Dockerfile
nginx/default.conf
```

## Observação

As alterações foram testadas localmente com Docker e estão funcionando corretamente na rota:

```text
http://localhost/nutricao/
```
