---
title: Flask Intro
description: Build a small web application with Flask and understand routing, templates, and request handling.
---
# Flask: A Minimal Web Framework
Flask is a lightweight framework for building web apps quickly.

## Hello Flask
```python filename="app.py"
from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello from Flask!'

@app.route('/api')
def api():
    return jsonify({'message':'Hello API'})

if __name__ == '__main__':
    app.run(debug=True)
```

## Templates (Jinja2)
Create `templates/index.html` and render it with `render_template()` for dynamic pages.

## Tips
- Use blueprints for larger apps to organize routes.
- Use `flask run` and the Flask CLI for development.
- Enable debug only in development, never in production.

## Exercise
- Build a small CRUD app for notes stored in-memory.