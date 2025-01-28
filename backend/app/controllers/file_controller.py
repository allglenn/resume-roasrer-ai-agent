from fastapi import HTTPException, UploadFile
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.file_service import FileService
from typing import Optional
from bson import ObjectId

class FileController:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.service = FileService(db)

    async def upload_file(self, file: UploadFile, user_id: str, career_interests: Optional[str] = None) -> dict:
        try:
            return await self.service.save_file(file, user_id, career_interests)
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=str(e)
            )

    async def get_file_path(self, file_id: str) -> str:
        """Get file path for viewing/downloading"""
        try:
            return await self.service.get_file_path(ObjectId(file_id))
        except Exception as e:
            raise HTTPException(
                status_code=404,
                detail=str(e)
            ) 