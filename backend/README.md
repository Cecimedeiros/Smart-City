# Smart City — Backend

API REST construída com **Express**, **PostgreSQL**, **Redis** e arquitetura de **microsserviços**.

---

## Tecnologias

| Tecnologia | Versão | Papel |
|---|---|---|
| Express | 4.18.2 | Framework web |
| TypeScript | 5.3.2 | Tipagem estática |
| Prisma | 5.0.0 | ORM e migrations |
| jsonwebtoken | 9.0.2 | Geração e verificação de JWT |
| bcryptjs | 2.4.3 | Hash de senhas |
| Redis | 4.6.10 | Cache de métricas |
| node-cron | 3.0.3 | Agendamento de jobs |
| dotenv | 16.3.1 | Variáveis de ambiente |

---

## Arquitetura

O projeto segue uma arquitetura de **microsserviços**, onde cada serviço é independente, possui suas próprias dependências e responsabilidades bem definidas.

```
backend/
├── auth-service/               # Serviço de autenticação (porta 3001)
│   ├── src/
│   │   ├── server.ts
│   │   ├── controllers/
│   │   │   └── authController.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── routes/
│   │   │   └── authRoutes.ts
│   │   └── middlewares/
│   │       ├── authMiddleware.ts
│   │       └── errorMiddleware.ts
│   └── package.json
│
├── demand-service/             # Serviço de demandas (porta 3002)
│   ├── src/
│   │   ├── server.ts
│   │   ├── controllers/
│   │   │   └── demandController.ts
│   │   ├── services/
│   │   │   └── demandService.ts
│   │   ├── repositories/
│   │   │   ├── denunciaRepository.ts
│   │   │   └── historicoRepository.ts
│   │   ├── routes/
│   │   │   └── demandRoutes.ts
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── migrations/
│   └── package.json
│
├── metrics-service/            # Serviço de métricas (porta 3003)
│   ├── src/
│   │   ├── server.ts
│   │   ├── controllers/
│   │   │   └── metricsController.ts
│   │   ├── services/
│   │   │   └── metricsService.ts
│   │   ├── routes/
│   │   │   └── metricsRoutes.ts
│   │   ├── middlewares/
│   │   │   └── errorMiddleware.ts
│   │   └── config/
│   │       ├── redis.ts
│   │       └── cron.ts
│   └── package.json
│
└── docker-compose.yml          # PostgreSQL + Redis + 3 serviços
```

---

## Responsabilidades de cada serviço

### auth-service (porta 3001)
Responsável por cadastro, autenticação e geração de tokens JWT. Nenhum outro serviço realiza login ou registro — tudo passa por aqui.

### demand-service (porta 3002)
Responsável pelo CRUD completo de demandas. Valida o JWT recebido consultando a chave secreta compartilhada. Acessa o PostgreSQL via Prisma ORM.

### metrics-service (porta 3003)
Responsável por agregar e servir KPIs e estatísticas. Usa Redis para cache das métricas e node-cron para atualização periódica dos dados.

---

## Fluxo de uma requisição

```
Cliente HTTP
    │
    ▼
Serviço correspondente (auth / demand / metrics)
    │  valida o JWT via authMiddleware (demand e metrics)
    ▼
Controller
    │  valida o corpo da requisição
    ▼
Service
    │  aplica regras de negócio
    ▼
Repository (apenas demand-service)
    │  executa queries via Prisma
    ▼
PostgreSQL / Redis
```

---

## Endpoints

### auth-service — porta 3001

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/auth/register` | Cadastra novo usuário | ❌ |
| POST | `/auth/login` | Autentica e retorna JWT | ❌ |

### demand-service — porta 3002

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/demands` | Lista todas as demandas | ✅ |
| POST | `/demands` | Cria nova demanda | ✅ |
| GET | `/demands/:id` | Detalha uma demanda | ✅ |
| PUT | `/demands/:id` | Atualiza uma demanda | ✅ |
| DELETE | `/demands/:id` | Remove uma demanda | ✅ |

### metrics-service — porta 3003

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/metrics` | Retorna KPIs e estatísticas | ✅ |

---

## Como rodar localmente

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose

### Passos

```bash
# 1. Subir PostgreSQL, Redis e os três serviços
docker-compose up -d

# Ou, para rodar cada serviço manualmente em desenvolvimento:

# auth-service
cd auth-service
npm install
cp .env.example .env.local
npm run dev

# demand-service
cd demand-service
npm install
cp .env.example .env.local
npx prisma migrate dev
npm run dev

# metrics-service
cd metrics-service
npm install
cp .env.example .env.local
npm run dev
```

---

## Variáveis de ambiente

Cada serviço tem seu próprio arquivo `.env.local`.

### auth-service
| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta do serviço | `3001` |
| `SECRET_KEY` | Chave secreta para assinar o JWT | `uma-chave-longa-e-aleatoria` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Tempo de expiração do token | `1440` |

### demand-service
| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta do serviço | `3002` |
| `DATABASE_URL` | Connection string do PostgreSQL | `postgresql://user:pass@localhost:5432/smartcity` |
| `SECRET_KEY` | Mesma chave do auth-service para validar JWT | `uma-chave-longa-e-aleatoria` |

### metrics-service
| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta do serviço | `3003` |
| `DATABASE_URL` | Connection string do PostgreSQL | `postgresql://user:pass@localhost:5432/smartcity` |
| `REDIS_URL` | Connection string do Redis | `redis://localhost:6379` |
| `SECRET_KEY` | Mesma chave do auth-service para validar JWT | `uma-chave-longa-e-aleatoria` |
