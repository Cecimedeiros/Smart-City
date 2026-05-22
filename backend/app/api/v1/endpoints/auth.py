from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user, require_role
from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token
from app.models.user import User
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserLogin, UserRead
from app.services.user_service import authenticate_user, create_user, get_user_by_email

router = APIRouter(prefix="/auth", tags=["Auth"])


def set_auth_cookie(response: Response, token: str) -> None:
    # O cookie HttpOnly ajuda o navegador a manter a sessão sem expor o token ao JavaScript.
    response.set_cookie(
        key=settings.ACCESS_TOKEN_COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


def build_token_response(user: User, response: Response) -> Token:
    # Cadastro e login usam a mesma resposta para manter o contrato da API simples.
    access_token = create_access_token(subject=str(user.id), extra_claims={"role": user.role})
    set_auth_cookie(response, access_token)
    return Token(access_token=access_token, user=UserRead.model_validate(user))


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, response: Response, db: AsyncSession = Depends(get_db)) -> Token:
    existing_user = await get_user_by_email(db, user_in.email)

    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="E-mail já cadastrado.")

    try:
        user = await create_user(db, user_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(exc)) from exc
    except IntegrityError as exc:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="E-mail já cadastrado.") from exc

    return build_token_response(user, response)


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, response: Response, db: AsyncSession = Depends(get_db)) -> Token:
    user = await authenticate_user(db, credentials.email, credentials.password)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas.")

    return build_token_response(user, response)


@router.post("/logout")
async def logout(response: Response) -> dict[str, str]:
    response.delete_cookie(settings.ACCESS_TOKEN_COOKIE_NAME)
    return {"message": "Logout realizado com sucesso."}


@router.get("/me", response_model=UserRead)
async def me(current_user: User = Depends(get_current_user)) -> User:
    return current_user


@router.get("/gestor-check", response_model=UserRead)
async def gestor_check(current_user: User = Depends(require_role("GESTOR"))) -> User:
    # Endpoint pequeno apenas para demonstrar a proteção por perfil.
    return current_user
