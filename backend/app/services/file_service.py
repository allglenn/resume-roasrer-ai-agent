import os
from datetime import datetime
from fastapi import UploadFile, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
import aiofiles
import shutil

class FileService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.files
        self.upload_dir = "/app/uploads"
        self.max_size = 10 * 1024 * 1024  # 10MB

    async def save_file(self, file: UploadFile, user_id: str) -> dict:
        # Validate file size
        file.file.seek(0, 2)  # Seek to end
        size = file.file.tell()
        file.file.seek(0)  # Reset position
        
        if size > self.max_size:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size is {self.max_size/1024/1024}MB"
            )

        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        # Create unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{user_id}_{timestamp}_{file.filename}"
        file_path = os.path.join(self.upload_dir, filename)

        # Save file using aiofiles
        try:
            async with aiofiles.open(file_path, 'wb') as out_file:
                content = await file.read()  # async read
                await out_file.write(content)  # async write
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Could not save file: {str(e)}"
            )

        # Save file metadata to MongoDB
        file_data = {
            "filename": filename,
            "original_filename": file.filename,
            "file_path": file_path,
            "upload_time": datetime.utcnow(),
            "file_size": size,
            "user_id": user_id
        }
        
        await self.collection.insert_one(file_data)
        return file_data 