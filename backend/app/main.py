from fastapi import FastAPI

<<<<<<< HEAD
from app.api.v1.router import api_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "smart-city-backend"}
=======
app = FastAPI(title='Smart City API')
>>>>>>> 49d05a055bb489dd60fe7a2ed679341194b0b335
