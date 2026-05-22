# Issue 22 — Autenticação real de usuários

Esta implementação segue a arquitetura existente do backend em **FastAPI**, organizada em camadas. A autenticação foi implementada sem mudar o padrão do projeto criado na pasta `backend/app`.

## O que foi implementado

A issue 22 foi atendida com cadastro, login, geração de JWT, cookie `HttpOnly`, logout, rota para consultar o usuário logado e verificação simples de perfil de gestor.

| Requisito | Onde foi implementado | Como funciona |
|---|---|---|
| Cadastro de usuário | `app/api/v1/endpoints/auth.py` e `app/services/user_service.py` | Recebe nome, e-mail, senha e perfil. A senha é salva como hash. |
| Login real | `app/api/v1/endpoints/auth.py` | Valida e-mail e senha, gera JWT e grava o token em cookie `HttpOnly`. |
| JWT | `app/core/security.py` | Cria e valida o token de acesso com expiração configurável. |
| Proteção de rotas | `app/api/deps.py` | `get_current_user` lê o token pelo header ou cookie e busca o usuário no banco. |
| Perfil de gestor | `app/api/deps.py` e `/auth/gestor-check` | `require_role("GESTOR")` bloqueia usuários sem permissão. |
| Dados do usuário logado | `app/api/v1/endpoints/users.py` e `/auth/me` | Retorna os dados do usuário autenticado. |

## Arquivos alterados

A implementação ficou concentrada nos pontos já previstos pela arquitetura do backend.

| Camada | Arquivos |
|---|---|
| Core | `app/core/config.py`, `app/core/database.py`, `app/core/security.py` |
| Models | `app/models/user.py` |
| Schemas | `app/schemas/user.py`, `app/schemas/token.py` |
| Services | `app/services/user_service.py` |
| Deps | `app/api/deps.py` |
| Endpoints | `app/api/v1/endpoints/auth.py`, `app/api/v1/endpoints/users.py` |
| Router/Main | `app/api/v1/router.py`, `app/main.py` |
| Dependências | `requirements.txt` |
| Migrations | `alembic/env.py`, `alembic/versions/20260522_0001_create_users_table.py` |

## Concorrência e paralelismo

O backend usa **concorrência assíncrona**, não paralelismo pesado. Isso combina com FastAPI, SQLAlchemy async e asyncpg, que já são a base da arquitetura do projeto.

| Item exigido | Resposta |
|---|---|
| Mecanismo utilizado | Corrotinas com `async`/`await`, executadas pelo servidor ASGI Uvicorn. |
| Componente onde aparece | Endpoints em `app/api/v1/endpoints/`, dependências em `app/api/deps.py` e serviços em `app/services/user_service.py`. |
| Problema resolvido | O servidor não fica bloqueado enquanto espera operações de banco de dados terminarem. Isso melhora a capacidade de atender mais de uma requisição ao mesmo tempo. |

Exemplo no código:

```python
async def login(credentials: UserLogin, response: Response, db: AsyncSession = Depends(get_db)) -> Token:
    user = await authenticate_user(db, credentials.email, credentials.password)
```

## Otimização

As otimizações foram simples e úteis para a issue, sem criar complexidade desnecessária.

| Otimização | Onde está | Impacto esperado |
|---|---|---|
| E-mail único e indexado | `app/models/user.py` | Evita usuários duplicados e melhora a busca por e-mail no login. |
| Normalização de e-mail | `app/services/user_service.py` | Evita cadastro duplicado com letras maiúsculas ou espaços. |
| Sessão assíncrona sem expirar objetos | `app/core/database.py` | Reduz consultas extras após `commit`, mantendo resposta simples. |
| Cookie `HttpOnly` | `app/api/v1/endpoints/auth.py` | Reduz risco de acesso ao token por JavaScript no navegador. |
| Validação por schemas | `app/schemas/user.py` | Bloqueia dados inválidos antes de chegar à regra de negócio. |

## Pontos de melhoria futura

A tabela `users` foi incluída em uma migration simples do Alembic para respeitar o fluxo de banco já previsto no backend. Se o projeto evoluir, poderiam ser adicionados refresh token, blacklist de logout com Redis e rate limit no login. Esses pontos não foram implementados agora porque não são necessários para a issue 22 e aumentariam a complexidade.
