# Smart City

Monorepo com frontend e backend do projeto Smart City.

## Estrutura

```
OIoi/
├── Smart-City/       # Frontend — Next.js
└── Back-SmartCity/   # Backend  — FastAPI
```

## Como rodar

### Frontend
```bash
cd Smart-City
npm install
npm run dev
```
> Disponível em http://localhost:3000

### Backend
```bash
cd Back-SmartCity
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```
> Disponível em http://localhost:8000
