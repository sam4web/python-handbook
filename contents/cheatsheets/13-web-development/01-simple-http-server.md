---
title: Simple HTTP Server
description: Start a basic HTTP server using Python's built-in http.server module.
---
# Python 3 built-in HTTP server
# Start server in current directory
python3 -m http.server 8000

# Custom handler example
from http.server import SimpleHTTPRequestHandler, HTTPServer

class MyHandler(SimpleHTTPRequestHandler):
    pass

server = HTTPServer(("localhost", 8080), MyHandler)
server.serve_forever()