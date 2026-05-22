# Smart City — Backend

API REST construída com **FastAPI** e **PostgreSQL**, com autenticação JWT e suporte a operações assíncronas.

---

## Tecnologias

| Tecnologia | Versão | Papel |
|---|---|---|
| FastAPI | 0.115.0 | Framework web |
| SQLAlchemy (async) | 2.0.35 | ORM |
| asyncpg | 0.29.0 | Driver async do PostgreSQL |
| Alembic | 1.13.3 | Migrations do banco |
| Pydantic v2 | 2.9.2 | Validação de dados |
| python-jose | 3.3.0 | Geração e verificação de JWT |
| passlib (bcrypt) | 1.7.4 | Hash de senhas |
| Uvicorn | 0.30.6 | Servidor ASGI |

---

## Arquitetura

O projeto segue uma arquitetura em camadas, separando responsabilidades em:

```
backend/
├── app/
│   ├── main.py               # Ponto de entrada da aplicação FastAPI
│   ├── api/
│   │   ├── deps.py           # Dependências compartilhadas (get_db, get_current_user)
│   │   └── v1/
│   │       ├── router.py     # Agrega todos os endpoints da versão 1
│   │       └── endpoints/
│   │           ├── auth.py   # POST /auth/register, POST /auth/login
│   │           ├── demands.py# CRUD /demands
│   │           └── users.py  # GET /users/me, PUT /users/me
│   ├── core/
│   │   ├── config.py         # Variáveis de ambiente via pydantic-settings
│   │   ├── database.py       # Engine e sessão async do SQLAlchemy
│   │   └── security.py       # Hash de senha e criação/validação de JWT
│   ├── models/
│   │   ├── user.py           # Modelo ORM de usuário
│   │   └── demand.py         # Modelo ORM de demanda
│   ├── schemas/
│   │   ├── user.py           # Schemas Pydantic de usuário (entrada e saída)
│   │   ├── demand.py         # Schemas Pydantic de demanda (entrada e saída)
│   │   └── token.py          # Schema do token JWT
│   └── services/
│       ├── user_service.py   # Lógica de negócio de usuários
│       └── demand_service.py # Lógica de negócio de demandas
├── alembic/
│   └── env.py                # Configuração das migrations
├── alembic.ini
├── requirements.txt
└── .env.example
```

### Fluxo de uma requisição

```
Cliente HTTP
    │
    ▼
Endpoint (api/v1/endpoints/)
    │  valida o corpo com Pydantic (schemas/)
    │  autentica via deps.py (JWT → get_current_user)
    ▼
Service (services/)
    │  aplica regras de negócio
    ▼
SQLAlchemy async (core/database.py)
    │
    ▼
PostgreSQL
```

### Camadas

- **Endpoints** — recebem a requisição HTTP, validam entrada com Pydantic e delegam ao service.
- **Services** — contêm toda a lógica de negócio (ex: verificar senha, autorizar ação).
- **Models** — mapeiam as tabelas do banco via SQLAlchemy ORM.
- **Schemas** — definem o formato esperado de entrada e saída de dados (Pydantic v2).
- **Core** — configuração global: variáveis de ambiente, conexão com o banco e segurança (JWT + bcrypt).
- **Deps** — injetores de dependência do FastAPI (`get_db` para sessão async, `get_current_user` para autenticação).

---

## Endpoints

### Auth
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/v1/auth/register` | Cadastra novo usuário |
| POST | `/api/v1/auth/login` | Autentica e retorna JWT |

### Usuários
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/v1/users/me` | Retorna dados do usuário logado | ✅ |
| PUT | `/api/v1/users/me` | Atualiza dados do usuário logado | ✅ |

### Demandas
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/v1/demands` | Lista todas as demandas | ✅ |
| POST | `/api/v1/demands` | Cria nova demanda | ✅ |
| GET | `/api/v1/demands/{id}` | Detalha uma demanda | ✅ |
| PUT | `/api/v1/demands/{id}` | Atualiza uma demanda | ✅ |
| DELETE | `/api/v1/demands/{id}` | Remove uma demanda | ✅ |

---

## Como rodar localmente

### Pré-requisitos
- Python 3.11+
- PostgreSQL rodando

### Passos

```bash
# 1. Instalar dependências
pip install -r requirements.txt

# 2. Configurar variáveis de ambiente
cp .env.example .env
# edite .env com sua DATABASE_URL e SECRET_KEY

# 3. Rodar as migrations
alembic upgrade head

# 4. Iniciar o servidor
uvicorn app.main:app --reload
```

A API estará disponível em `http://localhost:8000`.  
Documentação automática (Swagger): `http://localhost:8000/docs`

---

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | Connection string do PostgreSQL (async) | `postgresql+asyncpg://user:pass@localhost:5432/smartcity` |
| `SECRET_KEY` | Chave secreta para assinar o JWT | `uma-chave-longa-e-aleatoria` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Tempo de expiração do token em minutos | `1440` (24h) |
