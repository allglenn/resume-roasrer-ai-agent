from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database() -> AsyncIOMotorClient:
    return db.client.get_default_database()

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)

async def close_mongo_connection():
    db.client.close() 