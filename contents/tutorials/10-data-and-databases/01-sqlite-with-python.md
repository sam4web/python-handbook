---
title: SQLite & Python
description: Store and query structured data using SQLite and the `sqlite3` module, suitable for local development.
---
# Using SQLite with Python
SQLite is a lightweight, serverless relational database. Python's `sqlite3` module provides a simple API.

## Example
```python filename="sqlite_example.py"
import sqlite3
conn = sqlite3.connect('example.db')
cur = conn.cursor()
cur.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)')
cur.execute('INSERT INTO users (name) VALUES (?)', ('Alice',))
conn.commit()
for row in cur.execute('SELECT * FROM users'):
    print(row)
conn.close()
```

## Tips
- Use parameterized queries to avoid SQL injection.
- For multi-threaded apps, consider connection pooling or a different DB engine.

## Exercise
- Create a small CLI app that stores tasks in a SQLite DB and lists them.