<h1 align="center">
  🏙️ RESOLVE - Plataforma de Registro Eletrônico de Solicitações e Ocorrências com Verificação e Encaminhamento de Demandas Urbanas
</h1>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
</p>

<p align="center">
  Uma aplicação web para centralizar o registro de demandas urbanas, facilitar o acompanhamento das solicitações e oferecer mais visibilidade para os gestores, responsáveis por executar a resolução de problemas públicos.
</p>

---

## 🌍 Visão Geral

A plataforma busca melhorar a comunicação entre o cidadão e a gestão responsável, reduzindo a dispersão de informações e apoiando a tomada de decisão com dados operacionais em tempo real.

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

- [x] Cadastro e autenticação de usuários;
- [x] Criação e listagem de demandas urbanas;
- [x] Visualização detalhada de cada demanda;
- [x] Sistema de filtros avançados (prioridade, categoria, região  e status);
- [x] Atualização manual de status (exclusivo para gestores);
- [x] Visualizações em formato de Lista;
- [x] Painel administrativo para gestores (Métricas e KPIs);
- [x] Integração com API para simulação de dados.

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
| **Formulário de Demanda** | Coleta de dados da ocorrência (local, descrição, categoria, imagem, etc.). |
| **Detalhes da Demanda** | Visualização completa de todos os dados de um registro específico. |
| **Painel Administrativo** | Dashboard focado em métricas operacionais para os gestores. |
| **Sistema de Filtros** | Combinação de filtros por categoria, região, status e prioridade. |

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
| **Figma** | Protótipo | [Acesse aqui](https://www.figma.com/design/5qGAuNGrMKdG7AgXjG77YX/Smart-City?node-id=0-1&t=ew4wGee8wgaJ4qCo-1) |
| **BRmodelo** | Modelagem conceitual - Auth | [Acesse aqui](public/images/modeloConceitualAuth.png) |
| **BRmodelo** | Modelagem lógica - Auth | [Acesse aqui](public/images/modeloLogicoAuth.png) |
| **BRmodelo** | Modelagem conceitual - Demand | [Acesse aqui](public/images/modeloConceitualDemand.png) |
| **BRmodelo** | Modelagem lógica - Deman | [Acesse aqui](public/images/modeloLogicoDemand.png) |
| **Arquitetura** | Desenho da Arquitetura em Microsserviços | [Acesse aqui]() |


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
cd D:\Desktop\Smart-City\backend
copy .env.example .env.local
docker compose --env-file .env.local up -d --build
docker compose --env-file .env.local exec auth-service npx prisma migrate deploy
docker compose --env-file .env.local exec demand-service npx prisma migrate deploy
```
> Disponível em http://localhost:8000

---

## 👩‍💻 Equipe de Desenvolvimento

- Beatriz Paredes
- Cecília Medeiros
- Isabella Batista
- Jose Leandro De Morais
- Gabriel Souza
