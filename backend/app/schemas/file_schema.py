from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any

class FileResponse(BaseModel):
    file_id: str
    filename: str
    status: str
    upload_time: datetime
    analysis: Dict[str, Any]
    career_interests: Optional[str] = None

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        
class FileAnalysis(BaseModel):
    summary: str
    strengths: list[str]
    weaknesses: list[str]
    recommendations: list[str]
    keywords_missing: list[str]
    formatting_suggestions: list[str]
    impact_score: str
    detailed_feedback: Dict[str, str] 