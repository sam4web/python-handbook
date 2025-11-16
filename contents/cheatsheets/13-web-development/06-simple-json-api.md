---
title: Simple JSON API in Python
description: Build a minimal API without external frameworks using http.server.
---
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class APIHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        response = {"message": "Hello from JSON API"}
        self.wfile.write(json.dumps(response).encode())

server = HTTPServer(("localhost", 5000), APIHandler)
server.serve_forever()