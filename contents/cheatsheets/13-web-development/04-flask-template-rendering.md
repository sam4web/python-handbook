---
title: Flask Template Rendering
description: Serve HTML templates using Flask and Jinja2.
---
# app.py
from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", name="Python")

# templates/index.html
# <h1>Hello {{ name }}</h1>