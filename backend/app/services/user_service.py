<<<<<<< HEAD
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


def normalize_email(email: str) -> str:
    """Padroniza o e-mail para evitar duplicidade por maiúsculas ou espaços."""
    return email.strip().lower()


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    normalized_email = normalize_email(email)
    result = await db.execute(select(User).where(User.email == normalized_email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def create_user(db: AsyncSession, user_in: UserCreate) -> User:
    normalized_email = normalize_email(user_in.email)

    # O perfil de gestor exige um código simples para evitar cadastro indevido.
    if user_in.role == "GESTOR" and user_in.manager_access_code != settings.MANAGER_ACCESS_CODE:
        raise ValueError("Código de gestor inválido.")

    user = User(
        name=user_in.name.strip(),
        email=normalized_email,
        hashed_password=get_password_hash(user_in.password),
        role=user_in.role,
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def authenticate_user(db: AsyncSession, email: str, password: str) -> User | None:
    user = await get_user_by_email(db, email)

    if not user or not verify_password(password, user.hashed_password):
        return None

    return user


async def update_user(db: AsyncSession, user: User, user_in: UserUpdate) -> User:
    if user_in.name is not None:
        user.name = user_in.name.strip()

    if user_in.password is not None:
        user.hashed_password = get_password_hash(user_in.password)

    await db.commit()
    await db.refresh(user)
    return user
=======
# Logica de negocio de usuarios
>>>>>>> 49d05a055bb489dd60fe7a2ed679341194b0b335
