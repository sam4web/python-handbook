---
title: Requests Library
description: Make HTTP GET, POST, and other requests using Python.
---
import requests

# GET request
r = requests.get("https://api.example.com/data")
r.json()

# POST request
requests.post("https://api.example.com/post", json={"key": "value"})