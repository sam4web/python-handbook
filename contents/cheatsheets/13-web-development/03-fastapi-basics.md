---
title: FastAPI Basics
description: Fast and modern Python framework for building APIs.
---
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello FastAPI"}

# Run using: uvicorn filename:app --reload