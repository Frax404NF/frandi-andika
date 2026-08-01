from datetime import datetime, timezone
from typing import List, Optional
from sqlmodel import Session, select, func
from app.models import Task, TaskStatus
from app.schemas import TaskCreate, TaskUpdate, StatsResponse


def get_all_tasks(session: Session) -> List[Task]:
    """Returns all tasks ordered by created_at descending, with id as tiebreaker."""
    statement = select(Task).order_by(Task.created_at.desc(), Task.id.desc())
    return session.exec(statement).all()


def get_task_by_id(session: Session, task_id: int) -> Optional[Task]:
    """Returns a single task by primary key, or None if not found."""
    return session.get(Task, task_id)


def create_task(session: Session, data: TaskCreate) -> Task:
    """Inserts a new task row and returns the created record."""
    task = Task(
        title=data.title,
        description=data.description or "",
        status=data.status,
    )
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


def update_task(session: Session, task: Task, data: TaskUpdate) -> Task:
    """
    Applies a partial update to an existing task.
    Only fields present in the request body are modified.
    updated_at is always refreshed on every successful update.
    """
    patch = data.model_dump(exclude_unset=True)
    for field, value in patch.items():
        setattr(task, field, value)
    task.updated_at = datetime.now(timezone.utc).replace(tzinfo=None)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


def delete_task(session: Session, task: Task) -> None:
    """Deletes a task from the database."""
    session.delete(task)
    session.commit()


def get_stats(session: Session) -> StatsResponse:
    """Returns the total task count and a breakdown by each status value."""
    total = session.exec(select(func.count(Task.id))).one()
    todo = session.exec(
        select(func.count(Task.id)).where(Task.status == TaskStatus.todo)
    ).one()
    in_progress = session.exec(
        select(func.count(Task.id)).where(Task.status == TaskStatus.in_progress)
    ).one()
    done = session.exec(
        select(func.count(Task.id)).where(Task.status == TaskStatus.done)
    ).one()
    return StatsResponse(total=total, todo=todo, in_progress=in_progress, done=done)
