---
title: Flask Basics
description: Minimal example for building REST APIs and web apps using Flask.
---
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/api/data")
def data():
    return jsonify({"message": "Hello API"})

if __name__ == "__main__":
    app.run(debug=True)