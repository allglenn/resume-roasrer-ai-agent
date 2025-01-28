from fastapi import APIRouter, Depends, UploadFile, File, Form
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.controllers.file_controller import FileController
from app.schemas.file_schema import FileResponse
from typing import Optional

router = APIRouter()

@router.post("/upload/", response_model=FileResponse)
async def upload_file(
    file: UploadFile = File(...),
    career_interests: Optional[str] = Form(None),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Upload and analyze a PDF resume
    """
    user_id = "default_user"  # In production, get this from auth
    controller = FileController(db)
    return await controller.upload_file(file, user_id, career_interests) 