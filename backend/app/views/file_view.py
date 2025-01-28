from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.controllers.file_controller import FileController
from app.schemas.file_schema import FileResponse as FileResponseSchema
from typing import Optional
from bson import ObjectId
import os

router = APIRouter()

@router.post("/upload/", response_model=FileResponseSchema)
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

@router.get("/{file_id}/view")
async def view_file(
    file_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    View/download a PDF file
    """
    controller = FileController(db)
    file_path = await controller.get_file_path(file_id)
    
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
        
    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=os.path.basename(file_path),
        headers={
            "Content-Disposition": "inline; filename=" + os.path.basename(file_path),
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            "Content-Security-Policy": "default-src 'self'"
        }
    ) 