from datetime import datetime
from typing import Optional
from pydantic import field_validator, Field
from sqlmodel import SQLModel
from app.models import TaskStatus


class TaskCreate(SQLModel):
    """Request body for creating a new task."""
    title: str = Field(max_length=255)
    description: Optional[str] = ""
    status: Optional[TaskStatus] = TaskStatus.todo

    @field_validator("title")
    @classmethod
    def title_not_blank(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("title cannot be blank or whitespace-only")
        return v.strip()

    @field_validator("description", mode="before")
    @classmethod
    def normalize_description(cls, v) -> str:
        if v is None:
            return ""
        return v


class TaskUpdate(SQLModel):
    """
    Request body for updating a task. All fields are optional —
    only fields included in the request body will be modified.
    """
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None

    @field_validator("title")
    @classmethod
    def title_not_blank(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        if not v.strip():
            raise ValueError("title cannot be blank or whitespace-only")
        return v.strip()


class TaskResponse(SQLModel):
    """Response schema returned by all task endpoints."""
    id: int
    title: str
    description: str
    status: TaskStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class StatsResponse(SQLModel):
    """Response schema for the task statistics endpoint."""
    total: int
    todo: int
    in_progress: int
    done: int
