---
title: Exceptions & Try/Except
description: Catch and handle runtime errors using try/except/finally, and learn to raise custom exceptions.
---
# Exceptions and Error Handling
Use exceptions to handle unexpected situations without crashing the program.

## Basic try/except
```python filename="exceptions.py"
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print('Cannot divide by zero:', e)
finally:
    print('This runs always.')
```

## Raising exceptions
```python
def withdraw(amount, balance):
    if amount > balance:
        raise ValueError('Insufficient funds')
```

## Custom exceptions
```python
class MyError(Exception):
    pass
```

## Tips
- Catch specific exceptions, not `except Exception:` unless necessary.
- Use `finally` or context managers to release resources.

## Exercise
- Wrap file I/O operations with try/except and handle missing files gracefully.