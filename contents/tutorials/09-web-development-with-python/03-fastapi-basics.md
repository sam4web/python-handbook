---
title: FastAPI Basics
description: Create async-friendly REST APIs with automatic docs (OpenAPI) using FastAPI and Uvicorn.
---
# FastAPI: Modern, High-Performance APIs
FastAPI excels at building APIs quickly with type hints and automatic documentation.

## Hello FastAPI
```python filename="main.py"
from fastapi import FastAPI
app = FastAPI()

@app.get('/')
async def read_root():
    return {'message': 'Hello FastAPI'}
```
Run with: `uvicorn main:app --reload`

## Automatic docs
Visit `/docs` (Swagger UI) or `/redoc` to see auto-generated API docs.

## Tips
- Use Pydantic models for request/response validation.
- Prefer asynchronous endpoints for I/O-bound workloads.

## Exercise
- Build a small FastAPI service with a POST endpoint that validates input using a Pydantic model.