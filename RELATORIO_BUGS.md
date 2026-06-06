# Relatório de Bugs — Smart City

Bugs identificados via análise de integração entre frontend e backend após implementação dos serviços reais.

---

## Bug 01 — Cadastro sempre retornava erro 400

**Arquivo:** `frontend/src/Services/authService.ts`
**Severidade:** Alta
**Taxa de reprodução:** 100%
**Regressão:** Não

### Descrição
O formulário de cadastro enviava o campo `tipo` no corpo da requisição, mas o backend (`auth-service`) foi padronizado para receber `papel`. A incompatibilidade de nomes causava falha na validação do servidor, que retornava 400 para qualquer tentativa de cadastro.

### Causa
```ts
// antes (incorreto)
body: JSON.stringify({ nome, email, senha, tipo })

// depois (correto)
body: JSON.stringify({ nome, email, senha, papel: tipo })
```

---

## Bug 02 — Papel do usuário não era salvo após login

**Arquivos:** `frontend/src/Services/authService.ts` · `frontend/src/stores/useDemandStore.ts`
**Severidade:** Alta
**Taxa de reprodução:** 100%
**Regressão:** Não

### Descrição
A interface `AuthResponse` declarava o campo como `role`, mas o backend retorna `papel`. Após o login, `result.role` era `undefined`, fazendo com que o store salvasse `role: null`. Qualquer funcionalidade que dependia do papel do usuário (redirecionamento, filtro de rotas, permissões) deixava de funcionar.

### Causa
```ts
// interface antes (incorreta)
role: 'cidadao' | 'gestor'

// interface depois (correta)
papel: 'cidadao' | 'gestor'

// store antes (incorreto)
role: result.role   // undefined
if (result.role !== expectedRole)

// store depois (correto)
role: result.papel
if (result.papel !== expectedRole)
```

---

## Bug 03 — Todas as rotas do demand-service retornavam 404

**Arquivo:** `frontend/src/lib/api.ts`
**Severidade:** Alta
**Taxa de reprodução:** 100%
**Regressão:** Não

### Descrição
O `demand-service` registra todas as suas rotas com o prefixo `/demandas` (via `app.use('/demandas', demandRoutes)`). A URL base do frontend (`DEMAND_API_URL`) apontava apenas para `http://localhost:3002`, sem o prefixo. Todas as chamadas de listagem, criação e atualização de demandas chegavam em rotas inexistentes.

### Causa
```ts
// antes (incorreto)
DEMAND_API_URL = 'http://localhost:3002'
// chamadas chegavam em: /demands/feed → 404

// depois (correto)
DEMAND_API_URL = 'http://localhost:3002/demandas'
// chamadas chegam em: /demandas/demands/feed → 200
```

### Rotas afetadas
| Operação | URL errada | URL correta |
|---|---|---|
| Listar demandas (cidadão) | `/demands/feed` | `/demandas/demands/feed` |
| Listar demandas (gestor) | `/gestor/demands` | `/demandas/gestor/demands` |
| Criar demanda | `/demands` | `/demandas/demands` |
| Detalhe da demanda | `/demands/:id` | `/demandas/demands/:id` |
| Atualizar status | `/demands/:id/status` | `/demandas/demands/:id/status` |

---

## Resumo

| ID | Descrição | Severidade | Reprodução | Regressão | Status |
|---|---|---|---|---|---|
| BUG-01 | Cadastro retornava 400 (`tipo` vs `papel`) | Alta | 100% | Não | Corrigido |
| BUG-02 | Papel do usuário sempre `null` após login (`role` vs `papel`) | Alta | 100% | Não | Corrigido |
| BUG-03 | Rotas do demand-service retornavam 404 (prefixo `/demandas` faltando) | Alta | 100% | Não | Corrigido |
