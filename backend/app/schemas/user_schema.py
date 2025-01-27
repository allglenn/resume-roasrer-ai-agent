from typing import Annotated
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from bson import ObjectId

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str = Field(alias="_id")

    @classmethod
    def from_mongo(cls, data: dict):
        """Convert MongoDB response to UserResponse"""
        if data.get("_id"):
            data["_id"] = str(data["_id"])  # Convert ObjectId to string
        return cls(**data)

    model_config = ConfigDict(
        populate_by_name=True,
        json_schema_extra={
            "example": {
                "_id": "507f1f77bcf86cd799439011",
                "email": "user@example.com",
                "name": "John Doe"
            }
        }
    )

class Token(BaseModel):
    access_token: str
    token_type: str 