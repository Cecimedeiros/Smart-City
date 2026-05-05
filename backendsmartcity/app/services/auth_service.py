from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.security import create_access_token, hash_password, verify_password
from app.repositories import user_repository
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse


def register(db: Session, data: RegisterRequest) -> TokenResponse:
    if user_repository.get_by_email(db, data.email):
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    if data.role == "gestor":
        # Coloque código para validar data.codigo_acesso contra settings.GESTOR_ACCESS_CODE
        pass

    user = user_repository.create(db, data.nome, data.email, hash_password(data.senha), data.role)
    token = create_access_token({"sub": user.id, "role": user.role})
    return TokenResponse(access_token=token, role=user.role, nome=user.nome)


def login(db: Session, data: LoginRequest) -> TokenResponse:
    user = user_repository.get_by_email(db, data.email)
    if not user or not verify_password(data.senha, user.hashed_password):
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")

    # Coloque código para verificar se user.ativo é True, lançando HTTPException 403 se inativo

    token = create_access_token({"sub": user.id, "role": user.role})
    return TokenResponse(access_token=token, role=user.role, nome=user.nome)
