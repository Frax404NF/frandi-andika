from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.schemas import TaskCreate, TaskUpdate, TaskResponse, StatsResponse
from app import crud

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/stats", response_model=StatsResponse, summary="Get task statistics")
def get_stats(session: Session = Depends(get_session)):
    """Returns a summary count of tasks grouped by status."""
    return crud.get_stats(session)


@router.get("", response_model=List[TaskResponse], summary="List all tasks")
def get_tasks(session: Session = Depends(get_session)):
    """Returns all tasks ordered by creation date, newest first."""
    return crud.get_all_tasks(session)


@router.post("", response_model=TaskResponse, status_code=201, summary="Create a task")
def create_task(data: TaskCreate, session: Session = Depends(get_session)):
    """
    Creates a new task.

    - **title**: Required. Cannot be blank or whitespace-only.
    - **description**: Optional. Defaults to an empty string.
    - **status**: Must be one of `Todo`, `In Progress`, or `Done`. Defaults to `Todo`.
    """
    return crud.create_task(session, data)


@router.put("/{task_id}", response_model=TaskResponse, summary="Update a task")
def update_task(task_id: int, data: TaskUpdate, session: Session = Depends(get_session)):
    """
    Updates an existing task by ID. Supports partial updates — only fields
    included in the request body will be modified.

    Returns **404** if the task does not exist.
    """
    task = crud.get_task_by_id(session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return crud.update_task(session, task, data)


@router.delete("/{task_id}", summary="Delete a task")
def delete_task(task_id: int, session: Session = Depends(get_session)):
    """
    Deletes a task by ID.

    Returns **404** if the task does not exist.
    """
    task = crud.get_task_by_id(session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    crud.delete_task(session, task)
    return {"message": "Task deleted successfully"}
