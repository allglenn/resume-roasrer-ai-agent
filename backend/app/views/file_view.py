from fastapi import APIRouter, Depends, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.controllers.file_controller import FileController
from app.schemas.file_schema import FileResponse

router = APIRouter()

@router.post("/upload/", response_model=FileResponse)
async def upload_file(
    file: UploadFile = File(...),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Upload a PDF file with size < 10MB
    """
    # For now, using a dummy user_id. In production, get this from auth
    user_id = "default_user"
    controller = FileController(db)
    return await controller.upload_file(file, user_id) 