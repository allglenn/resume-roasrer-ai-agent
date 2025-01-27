import os
from datetime import datetime
from fastapi import UploadFile, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
import aiofiles
import PyPDF2
from io import BytesIO

class FileService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.files
        self.upload_dir = "/app/uploads"
        self.max_size = 10 * 1024 * 1024  # 10MB

    async def extract_and_save_content(self, file_path: str, file_id: ObjectId) -> str:
        """Extract text from PDF and save to MongoDB"""
        try:
            # Extract text from PDF
            with open(file_path, 'rb') as pdf_file:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                text_content = ""
                
                # Extract text from each page
                for page in pdf_reader.pages:
                    text_content += page.extract_text()

            # Update MongoDB document with extracted text
            await self.collection.update_one(
                {"_id": file_id},
                {
                    "$set": {
                        "content": text_content,
                        "processed_at": datetime.utcnow(),
                        "page_count": len(pdf_reader.pages)
                    }
                }
            )
            
            return text_content

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error extracting text from PDF: {str(e)}"
            )

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
            "user_id": user_id,
            "status": "uploaded",
            "content": None,  # Will be filled after processing
            "processed_at": None,
            "page_count": None
        }
        
        # Insert into MongoDB and get the ID
        result = await self.collection.insert_one(file_data)
        file_data["_id"] = result.inserted_id

        # Extract and save content
        try:
            content = await self.extract_and_save_content(file_path, result.inserted_id)
            file_data["content"] = content
            file_data["status"] = "processed"
        except Exception as e:
            # Update status to failed if extraction fails
            await self.collection.update_one(
                {"_id": result.inserted_id},
                {"$set": {"status": "failed", "error": str(e)}}
            )
            raise HTTPException(
                status_code=500,
                detail=f"Error processing file: {str(e)}"
            )

        return file_data 