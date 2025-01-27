from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.user_service import UserService
from app.schemas.user_schema import UserCreate, UserResponse

class UserController:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.service = UserService(db)

    async def create_user(self, user: UserCreate) -> UserResponse:
        db_user = await self.service.get_user_by_email(user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        return await self.service.create_user(user)

    async def get_user(self, user_id: str) -> UserResponse:
        user = await self.service.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user 