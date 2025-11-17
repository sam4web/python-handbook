---
title: Dunder Methods
description: Customize object behavior using special methods like __init__, __repr__, __str__, __add__, and more.
---
# Special Methods and Operator Overloading
Special ("dunder") methods allow objects to interact with Python language features and operators.

## Common special methods
- `__init__` — constructor
- `__repr__` — unambiguous representation
- `__str__` — user-friendly representation
- `__len__`, `__iter__`, `__contains__` — sequence protocol

## Example: __repr__ and __str__
```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __repr__(self):
        return f'Point({self.x}, {self.y})'
    def __str__(self):
        return f'({self.x}, {self.y})'
p = Point(1,2)
print(repr(p))
print(str(p))
```

## Tips
- Implement only the methods you need.
- Keep `__repr__` unambiguous; `__str__` for readability.

## Exercise
- Make a `Vector` class that supports addition with `+` via `__add__`.