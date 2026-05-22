<<<<<<< HEAD
from fastapi import Cookie, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.user import User
from app.services.user_service import get_user_by_id

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_PREFIX}/auth/login", auto_error=False)


async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str | None = Depends(oauth2_scheme),
    access_token: str | None = Cookie(default=None),
) -> User:
    """Valida o JWT enviado no header Authorization ou no cookie HttpOnly."""
    raw_token = token or access_token

    if not raw_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token não informado.")

    payload = decode_access_token(raw_token)
    user_id = payload.get("sub") if payload else None

    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido ou expirado.")

    user = await get_user_by_id(db, int(user_id))

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não encontrado.")

    return user


def require_role(required_role: str):
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role != required_role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso não autorizado para este perfil.")
        return current_user

    return role_checker
=======
# Dependencias: get_db, get_current_user
>>>>>>> 49d05a055bb489dd60fe7a2ed679341194b0b335
