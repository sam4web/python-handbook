---
title: Type Hints
description: Add type hints to your Python code to improve readability and enable static analysis tools like mypy.
---
# Type Hints and Static Typing
Type hints are optional but help document intent and catch errors before runtime.

## Basic hints
```python
def greet(name: str) -> str:
    return f'Hello, {name}'
```

## Complex types
```python
from typing import List, Dict, Optional, Tuple
def process(items: List[int]) -> Dict[str, int]:
    ...
```

## Checking with mypy
```bash
pip install mypy
mypy project/
```

## Tips
- Use `Optional` for values that can be `None`.
- Gradually add hints to an existing codebase.

## Exercise
- Add type hints to a small module and run `mypy` to see type checking results.