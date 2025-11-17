---
title: Deploying Python Apps
description: Deploy Python web apps using Gunicorn, Uvicorn, and containerization (Docker), plus basic CI/CD concepts.
---
# Deployment Basics
For production, run apps behind a process manager and reverse proxy.

## Example with Gunicorn & Uvicorn (FastAPI)
```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Containerization with Docker
Create a `Dockerfile` and build an image, then run as a container for consistency across environments.

## Tips
- Monitor and log application behavior (use Sentry, Prometheus etc.).
- Use environment variables for configuration (do not hardcode secrets).

## Exercise
- Dockerize a small Flask app and run it locally.