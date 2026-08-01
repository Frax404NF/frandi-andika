from datetime import datetime, timezone
from typing import Optional
from sqlmodel import Field, SQLModel
from enum import Enum


class TaskStatus(str, Enum):
    """Enumeration of valid task status values."""
    todo = "Todo"
    in_progress = "In Progress"
    done = "Done"


class Task(SQLModel, table=True):
    """Database table model for a task."""
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    description: str = Field(default="")
    status: TaskStatus = Field(default=TaskStatus.todo)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc).replace(tzinfo=None)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc).replace(tzinfo=None)
    )
