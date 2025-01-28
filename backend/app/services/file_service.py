import os
from datetime import datetime
from fastapi import UploadFile, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
import aiofiles
import PyPDF2
from io import BytesIO
from app.services.together_ai_service import TogetherAIService
from typing import Optional

class FileService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.files
        self.upload_dir = "/app/uploads"
        self.max_size = 10 * 1024 * 1024  # 10MB
        self.ai_service = TogetherAIService()

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

    async def save_file(self, file: UploadFile, user_id: str, career_interests: Optional[str] = None) -> dict:
        # Validate file size
        file.file.seek(0, 2)
        size = file.file.tell()
        file.file.seek(0)
        
        if size > self.max_size:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size is {self.max_size/1024/1024}MB"
            )

        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        # Create unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{user_id}_{timestamp}_{file.filename}"
        file_path = os.path.join(self.upload_dir, filename)

        try:
            # Save file
            async with aiofiles.open(file_path, 'wb') as out_file:
                content = await file.read()
                await out_file.write(content)

            # Extract text content
            text_content = await self.extract_text_content(file_path)

            # Get AI analysis
            analysis = await self.ai_service.analyze_resume(text_content, career_interests)

            # Save metadata to MongoDB
            file_data = {
                "filename": filename,
                "original_filename": file.filename,
                "file_path": file_path,
                "upload_time": datetime.utcnow(),
                "file_size": size,
                "user_id": user_id,
                "content": text_content,
                "analysis": analysis,
                "career_interests": career_interests,
                "processed_at": datetime.utcnow(),
                "status": "processed"
            }
            
            result = await self.collection.insert_one(file_data)
            file_data["_id"] = result.inserted_id

            # Return analysis response
            return {
                "file_id": str(result.inserted_id),
                "filename": file.filename,
                "analysis": analysis,
                "status": "processed",
                "upload_time": datetime.utcnow().isoformat()
            }

        except Exception as e:
            # Clean up file if saved
            if os.path.exists(file_path):
                os.remove(file_path)
            raise HTTPException(
                status_code=500,
                detail=f"Error processing file: {str(e)}"
            )

    async def extract_text_content(self, file_path: str) -> str:
        """Extract text from PDF file"""
        try:
            with open(file_path, 'rb') as pdf_file:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                text_content = ""
                for page in pdf_reader.pages:
                    text_content += page.extract_text()
            return text_content
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error extracting text from PDF: {str(e)}"
            )

    async def analyze_resume_content(self, file_id: ObjectId, career_interests: Optional[str] = None) -> dict:
        """Analyze resume content using Together AI"""
        # Get file document
        file_doc = await self.collection.find_one({"_id": file_id})
        if not file_doc or not file_doc.get("content"):
            raise HTTPException(
                status_code=404,
                detail="File not found or content not extracted"
            )

        try:
            # Get AI analysis
            analysis = await self.ai_service.analyze_resume(
                file_doc["content"],
                career_interests
            )

            # Update MongoDB with analysis
            await self.collection.update_one(
                {"_id": file_id},
                {
                    "$set": {
                        "analysis": analysis,
                        "analyzed_at": datetime.utcnow()
                    }
                }
            )

            return analysis
        except Exception as e:
            await self.collection.update_one(
                {"_id": file_id},
                {"$set": {"analysis_error": str(e)}}
            )
            raise HTTPException(
                status_code=500,
                detail=f"Error analyzing resume: {str(e)}"
            )

    async def get_file_path(self, file_id: ObjectId) -> str:
        """Get file path from database"""
        file_doc = await self.collection.find_one({"_id": file_id})
        if not file_doc:
            raise Exception("File not found")
            
        file_path = file_doc.get("file_path")
        if not file_path or not os.path.exists(file_path):
            raise Exception("File not found on disk")
            
        return file_path 