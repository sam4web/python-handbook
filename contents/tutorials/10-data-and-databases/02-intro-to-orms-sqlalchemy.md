---
title: SQLAlchemy Intro
description: Object-relational mapping with SQLAlchemy, define models, query with Python objects, and migrate schemas.
---
# Intro to ORMs with SQLAlchemy
ORMs let you interact with databases using Python classes instead of raw SQL.

## Basic example (SQLAlchemy Core omitted for brevity)
```python filename="models.py"
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)

engine = create_engine('sqlite:///example.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()
session.add(User(name='Alice'))
session.commit()
```

## Tips
- Use Alembic for migrations.
- Understand how lazy loading and eager loading affect performance.

## Exercise
- Build a small app that persists and queries books using SQLAlchemy models.
