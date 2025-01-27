from fastapi import HTTPException, UploadFile
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.file_service import FileService

class FileController:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.service = FileService(db)

    async def upload_file(self, file: UploadFile, user_id: str) -> dict:
        try:
            return await self.service.save_file(file, user_id)
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=str(e)
            ) 