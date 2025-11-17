---
title: Decorators & Context Managers
description: Learn to modify functions with decorators and manage resources cleanly with context managers.
---
# Decorators and Context Managers
Decorators wrap functions to extend behavior; context managers manage setup/teardown (the `with` statement).

## Simple decorator
```python filename="decorators.py"
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print('Elapsed:', time.time() - start)
        return result
    return wrapper

@timer
def compute():
    sum(i*i for i in range(10000))
```

## Context manager (with)
```python
with open('file.txt') as f:
    data = f.read()
```

Custom context manager using `contextlib`:
```python
from contextlib import contextmanager

@contextmanager
def my_ctx():
    print('enter')
    try:
        yield
    finally:
        print('exit')
```

## Tips
- Use decorators for logging, caching, and authorization checks.
- Keep decorator implementations simple and use `functools.wraps` to preserve metadata.

## Exercise
- Implement a caching decorator that memoizes function results.