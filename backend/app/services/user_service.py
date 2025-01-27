from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse
from app.core.security import get_password_hash
from bson import ObjectId

class UserService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.users

    async def create_user(self, user: UserCreate) -> UserResponse:
        user_dict = {
            "email": user.email,
            "name": user.name,
            "hashed_password": get_password_hash(user.password),
            "created_at": datetime.utcnow()
        }
        result = await self.collection.insert_one(user_dict)
        user_dict["_id"] = result.inserted_id
        return UserResponse.from_mongo(user_dict)

    async def get_user_by_id(self, user_id: str) -> UserResponse:
        user = await self.collection.find_one({"_id": ObjectId(user_id)})
        if user:
            return UserResponse.from_mongo(user)
        return None

    async def get_user_by_email(self, email: str) -> UserResponse:
        user = await self.collection.find_one({"email": email})
        if user:
            return UserResponse.from_mongo(user)
        return None 