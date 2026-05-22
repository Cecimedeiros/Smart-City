<<<<<<< HEAD
from fastapi import APIRouter

from app.api.v1.endpoints import auth, users

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(users.router)
=======
# Agrupa todos os endpoints da v1
>>>>>>> 49d05a055bb489dd60fe7a2ed679341194b0b335
