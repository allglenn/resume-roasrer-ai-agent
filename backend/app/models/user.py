from datetime import datetime
from typing import Annotated
from pydantic import BaseModel, Field, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, handler):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls, 
        _schema_generator: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        return {"type": "string"}

class User(BaseModel):
    id: Annotated[PyObjectId, Field(default_factory=PyObjectId, alias="_id")]
    email: str
    name: str
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_schema_extra": {
            "example": {
                "email": "user@example.com",
                "name": "John Doe",
                "hashed_password": "hashedpassword123"
            }
        }
    } 