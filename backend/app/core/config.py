<<<<<<< HEAD
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configurações principais da API carregadas por variáveis de ambiente."""

    PROJECT_NAME: str = "Smart City API"
    API_V1_PREFIX: str = "/api/v1"
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost:5432/smartcity"
    SECRET_KEY: str = "change-me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    MANAGER_ACCESS_CODE: str = "GESTOR123"
    ACCESS_TOKEN_COOKIE_NAME: str = "access_token"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
=======
# Configuracoes da aplicacao (env vars)
>>>>>>> 49d05a055bb489dd60fe7a2ed679341194b0b335
