---
title: Simple HTTP Server
description: Start a basic HTTP server using Python's http.server and build a minimal JSON API.
---
# Simple HTTP Server
Use Python's built-in HTTP server for quick testing or sharing static files.

## Quick static server
```bash
python3 -m http.server 8000
```
Open http://localhost:8000 in your browser.

## Minimal JSON API using http.server
```python filename="simple_api.py"
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'message':'Hello'}).encode())

HTTPServer(('localhost', 5000), Handler).serve_forever()
```

## Tips
- For production web servers, use frameworks (Flask, FastAPI) and production-grade servers (Gunicorn, Uvicorn).
- Use this built-in server only for development and testing.

## Exercise
- Build a simple endpoint that returns the current server time as JSON.