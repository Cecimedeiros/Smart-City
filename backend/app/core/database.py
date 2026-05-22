<<<<<<< HEAD
from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings


class Base(DeclarativeBase):
    pass


engine = create_async_engine(settings.DATABASE_URL, echo=False, pool_pre_ping=True)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Entrega uma sessão assíncrona do banco para as rotas via Depends."""
    async with AsyncSessionLocal() as session:
        yield session
=======
# Conexao com o banco de dados (SQLAlchemy async)
>>>>>>> 49d05a055bb489dd60fe7a2ed679341194b0b335
