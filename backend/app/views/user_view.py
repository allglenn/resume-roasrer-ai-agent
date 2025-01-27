from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.controllers.user_controller import UserController
from app.schemas.user_schema import UserCreate, UserResponse

router = APIRouter()

@router.post("/users/", response_model=UserResponse)
async def create_user(
    user: UserCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    controller = UserController(db)
    return await controller.create_user(user)

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    controller = UserController(db)
    return await controller.get_user(user_id) 