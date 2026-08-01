from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_and_tables
from app.routers import tasks


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initializes the database tables on application startup."""
    create_db_and_tables()
    yield


app = FastAPI(
    title="Task Tracker API",
    description="A REST API for managing team tasks. Built with FastAPI and PostgreSQL.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)


@app.get("/", tags=["health"], summary="Health check")
def root():
    """Returns a simple health check response."""
    return {"message": "Task Tracker API is running", "docs": "/docs"}
