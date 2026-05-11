# API - Clínica de Nutrição

Base URL: `http://localhost:3001`

## Autenticação

### Cadastro de paciente
**POST** `/api/auth/register`

Body:
```json
{
  "nome": "Nome do Paciente",
  "email": "email@exemplo.com",
  "senha": "senha123",
  "dados_pessoais": {}
}
```

### Login
**POST** `/api/auth/login`

Body:
```json
{
  "email": "email@exemplo.com",
  "senha": "senha123"
}
```

Retorna:
```json
{
  "token": "eyJ..."
}
```

### Logout
**POST** `/api/auth/logout`

---

## Planos Alimentares
> Todas as rotas exigem header: `Authorization: Bearer <token>`

### Buscar plano por ID
**GET** `/api/planos/:id`

### Criar plano
**POST** `/api/planos`

Body:
```json
{
  "paciente_id": 1,
  "nutricionista_id": 1,
  "descricao": "Descrição do plano",
  "status": "ativo"
}
```

### Atualizar plano
**PUT** `/api/planos/:id`

Body:
```json
{
  "descricao": "Nova descrição",
  "status": "inativo"
}
```

### Remover plano
**DELETE** `/api/planos/:id`

---

## Pacientes
> Todas as rotas exigem header: `Authorization: Bearer <token>`

### Buscar paciente por ID
**GET** `/api/pacientes/:id`

### Atualizar paciente
**PUT** `/api/pacientes/:id`

### Histórico de planos do paciente
**GET** `/api/pacientes/:id/planos`

---

## Notícias

### Listar todas
**GET** `/api/noticias`

### Buscar por ID
**GET** `/api/noticias/:id`

### Criar notícia
> Exige autenticação

**POST** `/api/noticias`

Body:
```json
{
  "titulo": "Título da notícia",
  "conteudo": "Conteúdo da notícia"
}
```

### Atualizar notícia
> Exige autenticação

**PUT** `/api/noticias/:id`