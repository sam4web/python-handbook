---
title: Uvicorn & Gunicorn
description: Production server options for FastAPI/Flask.
---
# Start FastAPI app
uvicorn app:app --host 0.0.0.0 --port 8000 --reload

# Production with Gunicorn + Uvicorn workers
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker