<h1 align="center">
  🏙️ Sistema de Gerenciamento de Demandas do Estado
</h1>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
</p>

<p align="center">
  Uma aplicação web para centralizar o registro de demandas urbanas, facilitar o acompanhamento das solicitações e oferecer mais visibilidade para os gestores privados, responsáveis por executar a resolução de problemas públicos.
</p>

---

## 🌍 Visão Geral

A plataforma busca melhorar a comunicação entre o cidadão e a gestão privada, reduzindo a dispersão de informações e apoiando a tomada de decisão com dados operacionais em tempo real.

### 🎯 O Problema Central
A ausência de uma plataforma centralizada para registro, rastreabilidade e priorização de demandas urbanas dificulta a tomada de decisão por parte da gestão e reduz a eficiência no atendimento à população.

### 🏛️ Alinhamento com Políticas Públicas
A proposta dialoga com as diretrizes de transformação digital no setor público, em especial a **Lei nº 14.129/2021 (Lei do Governo Digital)**, estabelecendo princípios como:
- Eficiência administrativa e desburocratização;
- Transparência;
- Uso de soluções digitais para melhorar os serviços públicos.

Relaciona-se também com a **Estratégia Nacional de Governo Digital**, incentivando o uso de tecnologias para melhorar a relação entre o governo e o cidadão.

---

## ✅ Objetivos Específicos
- **Centralizar** o registro de demandas urbanas.
- **Permitir** o acompanhamento claro das solicitações.
- **Oferecer** visibilidade operacional para os gestores.
- **Aumentar** a transparência no atendimento à população.
- **Organizar** o fluxo de demandas com base na prioridade, data e status.

---

## 👥 Perfis de Usuário

### 🧑‍💼 Cidadão
Responsável por:
- [x] Registrar demandas urbanas.
- [x] Visualizar a lista de demandas.
- [x] Consultar detalhes das solicitações.
- [x] Acompanhar o status das solicitações.

### 🏢 Gestor Público
Responsável por:
- [x] Visualizar demandas registradas de forma global.
- [x] Filtrar solicitações e atualizar o status manualmente.
- [x] Acessar o painel administrativo (Dashboard).
- [x] Acompanhar indicadores operacionais cruciais.

---

## 🚀 Funcionalidades do MVP

- [ ] Cadastro e autenticação de usuários;
- [ ] Criação e listagem de demandas urbanas;
- [ ] Visualização detalhada de cada demanda;
- [ ] Sistema de filtros avançados (prioridade, categoria, região  e status);
- [ ] Atualização manual de status (exclusivo para gestores);
- [ ] Visualizações em formato de Lista;
- [ ] Painel administrativo para gestores (Métricas e KPIs);
- [ ] Integração com API *fake* para simulação de dados.

---

## 📊 Indicadores Operacionais (Gestão)
O painel administrativo acompanha, no mínimo:
1. **Volume:** Quantidade total de demandas registradas;
2. **Distribuição:** Demandas por categoria;
3. **Geografia:** Demandas por região.

---

## 🖥️ Telas do Projeto

### 🥇 Prioridade Alta
| Tela | Descrição |
|---|---|
| **Página Inicial (Cidadão)** | Destaque para o fluxo do cidadão, listagem de demandas, sistema de filtros e acesso à área do gestor. |
| **Página Inicial (Gestor)** | Listagem geral, filtros avançados, acesso ao painel administrativo e ações de edição/atualização de status. |
| **Formulário de Demanda** | Coleta de dados da ocorrência (local, descrição, categoria, canal, etc.). |
| **Detalhes da Demanda** | Visualização completa de todos os dados de um registro específico. |
| **Painel Administrativo** | Dashboard focado em métricas operacionais para os gestores. |
| **Sistema de Filtros** | Combinação de filtros por tipo, região, status, data, canal e prioridade. |

### 🥈 Prioridade Secundária
| Tela | Descrição |
|---|---|
| **Login e Cadastro** | Acesso segmentado (`Sou cidadão` ou `Sou gestor`) com email e senha. |

---

## ⚙️ Stack Tecnológica

| Camada | Tecnologias Utilizadas |
| :--- | :--- |
| **Front-end** | `TypeScript`, `Next.js`, `Chakra UI`, `Tailwind CSS`, `Zustand` |
| **Back-end & Integração** | `Node.js`, `Express`, `Prisma ORM` |
| **Autenticação & Dados** | `JWT`, `Cookies`, `Redis`, `Cron Jobs`, `API Fake` |

---

## 🔗 Links Úteis

| Ferramenta Utilizada | Material | Links |
| :--- | :--- | :---
| **Figma** | Protótipo | https://www.figma.com/design/5qGAuNGrMKdG7AgXjG77YX/Smart-City?node-id=0-1&t=ew4wGee8wgaJ4qCo-1 |
| **BRmodelo** | Modelagem conceitual | https://app.brmodeloweb.com/publicview/6a08cc4149bbefa91a521ff7 |


---

## 🏗️ Arquitetura Front-end

A proposta prioriza uma estrutura simples, escalável e de fácil manutenção, com separação clara de responsabilidades.

<details>
<summary><b>📂 Estrutura de Pastas (Clique para expandir)</b></summary>

```text
src/
  app/
    (public)/
      page.tsx
      login/page.tsx
      cadastro/page.tsx
      demandas/
        nova/page.tsx
        [id]/page.tsx
    (gestor)/
      gestor/
        page.tsx
        dashboard/page.tsx
        kanban/page.tsx
        demandas/[id]/page.tsx
    layout.tsx
    providers.tsx

  components/
    auth/
    demands/
    dashboard/
    layout/

  services/
    api.ts
    auth.service.ts
    demands.service.ts
    dashboard.service.ts

  stores/
    auth.store.ts
    filter.store.ts

  hooks/
    useAuth.ts
    useDemands.ts
    useDashboard.ts

  types/
    auth.ts
    demand.ts
    dashboard.ts
    api.ts

  lib/
    constants.ts
    formatters.ts
    guards.ts

  mocks/
    fake-data.ts
```

</details>

---

## 🚀 Como Rodar

### Frontend
```bash
cd Smart-City
npm install
npm run dev
```
> Disponível em http://localhost:3000

### Backend (FastAPI)
```bash
cd Back-SmartCity
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```
> Disponível em http://localhost:8000

---

## 👩‍💻 Equipe de Desenvolvimento

- Beatriz Paredes
- Cecília Medeiros
- Isabella Batista
- Jose Leandro De Morais
- Gabriel Souza
