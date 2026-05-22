<<<<<<< HEAD
from pydantic import BaseModel

from app.schemas.user import UserRead


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead
=======
# Schema do Token JWT
>>>>>>> 49d05a055bb489dd60fe7a2ed679341194b0b335
