from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://mongo:27017/resume_roaster"
    SECRET_KEY: str = "your-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings() 