from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.views.user_view import router as user_router
from app.views.file_view import router as file_router
from app.core.database import connect_to_mongo, close_mongo_connection

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition", "Content-Type", "Content-Length"]
)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include routers
app.include_router(user_router, prefix="/api/v1")
app.include_router(file_router, prefix="/api/v1/files") 