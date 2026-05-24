# Smart City — Backend

API REST construída com **Express** e **PostgreSQL**, com autenticação JWT e Prisma ORM.

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

O projeto segue uma arquitetura em camadas, separando responsabilidades em:

```
backend/
├── src/
│   ├── server.ts             # Ponto de entrada do servidor Express
│   ├── config/
│   │   ├── database.ts       # Configuração da conexão com PostgreSQL
│   │   ├── redis.ts          # Configuração do cliente Redis
│   │   └── cron.ts           # Agendamento de jobs com node-cron
│   ├── controllers/
│   │   ├── authController.ts    # Lógica HTTP de autenticação
│   │   ├── demandController.ts  # Lógica HTTP de demandas
│   │   └── metricsController.ts # Lógica HTTP de métricas
│   ├── middlewares/
│   │   ├── authMiddleware.ts    # Validação do JWT nas rotas protegidas
│   │   └── errorMiddleware.ts   # Tratamento centralizado de erros
│   ├── repositories/
│   │   ├── userRepository.ts       # Acesso ao banco para usuários
│   │   ├── denunciaRepository.ts   # Acesso ao banco para denúncias
│   │   └── historicoRepository.ts  # Acesso ao banco para histórico
│   ├── routes/
│   │   ├── authRoutes.ts    # Rotas de autenticação
│   │   ├── demandRoutes.ts  # Rotas de demandas
│   │   └── metricsRoutes.ts # Rotas de métricas
│   ├── services/
│   │   ├── authService.ts     # Lógica de negócio de autenticação
│   │   ├── demandService.ts   # Lógica de negócio de demandas
│   │   └── metricsService.ts  # Agregação e cache de métricas
│   └── prisma/
│       ├── schema.prisma      # Schema do banco (Prisma ORM)
│       └── migrations/        # Histórico de migrations do Prisma
├── docker-compose.yml        # PostgreSQL via Docker
├── package.json
└── .env.example
```

### Fluxo de uma requisição

```
Cliente HTTP
    │
    ▼
Route (routes/)
    │  valida o JWT via authMiddleware
    ▼
Controller (controllers/)
    │  valida o corpo da requisição
    ▼
Service (services/)
    │  aplica regras de negócio
    ▼
Repository (repositories/)
    │  executa queries via Prisma
    ▼
PostgreSQL
```

### Camadas

- **Routes** — definem os endpoints e aplicam os middlewares necessários.
- **Controllers** — recebem a requisição HTTP, validam a entrada e delegam ao service.
- **Services** — contêm toda a lógica de negócio (ex: verificar senha, autorizar ação).
- **Repositories** — isolam o acesso ao banco de dados via Prisma ORM.
- **Middlewares** — validação de JWT e tratamento centralizado de erros.
- **Config** — configuração global: conexão com PostgreSQL, Redis e cron jobs.

---

## Endpoints

### Auth
| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | Cadastra novo usuário |
| POST | `/auth/login` | Autentica e retorna JWT |

### Demandas
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/demands` | Lista todas as demandas | ✅ |
| POST | `/demands` | Cria nova demanda | ✅ |
| GET | `/demands/:id` | Detalha uma demanda | ✅ |
| PUT | `/demands/:id` | Atualiza uma demanda | ✅ |
| DELETE | `/demands/:id` | Remove uma demanda | ✅ |

### Métricas
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/metrics` | Retorna KPIs e estatísticas | ✅ |

---

## Como rodar localmente

### Pré-requisitos
- Node.js 20+
- Docker (para o PostgreSQL)

### Passos

```bash
# 1. Subir o banco de dados
docker-compose up -d

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# edite .env.local com sua DATABASE_URL e SECRET_KEY

# 4. Rodar as migrations
npx prisma migrate dev

# 5. Iniciar o servidor
npm run dev
```

---

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | Connection string do PostgreSQL | `postgresql://user:pass@localhost:5432/smartcity` |
| `SECRET_KEY` | Chave secreta para assinar o JWT | `uma-chave-longa-e-aleatoria` |
| `REDIS_URL` | Connection string do Redis | `redis://localhost:6379` |
