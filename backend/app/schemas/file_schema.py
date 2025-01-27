from pydantic import BaseModel
from datetime import datetime

class FileResponse(BaseModel):
    filename: str
    file_path: str
    upload_time: datetime
    file_size: int
    user_id: str 