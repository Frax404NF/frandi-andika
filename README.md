# Task Tracker — Frandi Andika

A web application for managing team tasks. Built as a technical test submission.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI 0.141, Python 3.10 |
| ORM | SQLModel 0.0.39 (SQLAlchemy + Pydantic) |
| Database | PostgreSQL 16 |
| Frontend | React 19 (Vite), Hooks |
| Containerization | Docker + Docker Compose |

---

## Project Structure

```
frandi-andika/
├── backend/          # FastAPI REST API
├── frontend/         # React SPA
└── README.md
```

---

## Running Locally (Without Docker)

### Prerequisites
- Python 3.10+
- PostgreSQL 16 running locally
- Node.js 20+

### Backend

**1. Create and activate a virtual environment**
```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

**2. Install dependencies**
```bash
pip install -r requirements.txt
```

**3. Set up the database**

Connect to PostgreSQL and run:
```sql
CREATE USER taskuser WITH PASSWORD 'taskpass';
CREATE DATABASE taskdb OWNER taskuser;
```

**4. Configure environment variables**
```bash
cp .env.example .env
# Edit .env if your PostgreSQL credentials differ from the defaults
```

`.env` contents:
```
DATABASE_URL=postgresql://taskuser:taskpass@localhost:5432/taskdb
```

**5. Start the backend server**
```bash
fastapi dev app/main.py
```

The API will be available at **http://localhost:8000**  
Interactive docs (Swagger UI): **http://localhost:8000/docs**

> Database tables are created automatically on first startup — no migration step needed.

---

### Frontend

> **TODO: Fill in after frontend implementation**

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

`.env` contents:
```
VITE_API_URL=http://localhost:8000
```

---

## Running with Docker Compose

**Prerequisites:** Docker Desktop installed and running.

**1. Configure environment**
```bash
cp .env.example .env
# Default values in .env.example work out of the box
```

**2. Start all services**
```bash
docker compose up --build
```

This starts three services:
| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| PostgreSQL | localhost:5432 |

**3. Stop all services**
```bash
docker compose down
```

To also delete the database volume:
```bash
docker compose down -v
```

---

## Environment Variables

### `backend/.env`

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://taskuser:taskpass@localhost:5432/taskdb` |

### `frontend/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

### Root `.env` (Docker Compose only)

| Variable | Description | Default |
|---|---|---|
| `POSTGRES_DB` | Database name | `taskdb` |
| `POSTGRES_USER` | Database user | `taskuser` |
| `POSTGRES_PASSWORD` | Database password | `taskpass` |

> `.env` files are listed in `.gitignore` and are never committed. Use the `.env.example` files as templates.

---

## API Endpoints

Base URL: `http://localhost:8000`

All timestamps are UTC, formatted as `YYYY-MM-DDTHH:MM:SS`.

---

### GET /tasks

Returns all tasks ordered by creation date, newest first.

**Response 200 OK**
```json
[
  {
    "id": 1,
    "title": "Belajar FastAPI",
    "description": "Membaca dokumentasi resmi",
    "status": "In Progress",
    "created_at": "2025-07-15T10:00:00",
    "updated_at": "2025-07-15T10:00:00"
  }
]
```

---

### POST /tasks

Creates a new task.

**Request Body**
```json
{
  "title": "Judul task",
  "description": "Deskripsi opsional",
  "status": "Todo"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | Max 255 chars. Cannot be blank or whitespace-only. |
| `description` | string | ❌ | Defaults to `""` |
| `status` | string | ❌ | `Todo` \| `In Progress` \| `Done`. Defaults to `Todo` |

**Response 201 Created**
```json
{
  "id": 2,
  "title": "Judul task",
  "description": "Deskripsi opsional",
  "status": "Todo",
  "created_at": "2025-07-15T11:00:00",
  "updated_at": "2025-07-15T11:00:00"
}
```

**Error Responses**
| Status | Condition |
|---|---|
| 422 | `title` is missing, blank, whitespace-only, or exceeds 255 characters |
| 422 | `status` is not one of the valid enum values |

---

### PUT /tasks/{id}

Updates an existing task. Supports **partial update** — only fields included in the request body are modified.

**Request Body** (all fields optional)
```json
{
  "status": "Done"
}
```

**Response 200 OK** — returns the full updated task object.
```json
{
  "id": 2,
  "title": "Judul task",
  "description": "Deskripsi opsional",
  "status": "Done",
  "created_at": "2025-07-15T11:00:00",
  "updated_at": "2025-07-15T12:30:00"
}
```

**Error Responses**
| Status | Body | Condition |
|---|---|---|
| 404 | `{"detail": "Task not found"}` | Task ID does not exist |
| 422 | validation error detail | `title` is blank or `status` is invalid |

---

### DELETE /tasks/{id}

Deletes a task by ID.

**Response 200 OK**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses**
| Status | Body | Condition |
|---|---|---|
| 404 | `{"detail": "Task not found"}` | Task ID does not exist |

---

### GET /tasks/stats

Returns a count of tasks grouped by status.

**Response 200 OK**
```json
{
  "total": 10,
  "todo": 4,
  "in_progress": 3,
  "done": 3
}
```
