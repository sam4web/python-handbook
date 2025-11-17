---
title: Classes & Objects
description: Understand classes, instances, methods, attributes, and the basics of object-oriented design in Python.
---
# Classes and Objects (OOP)
OOP helps model real-world concepts. A class defines the structure and behavior; an object (instance) is a concrete realization.

## Basic class
```python filename="person.py"
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f'Hello, I am {self.name} and I am {self.age} years old.')
p = Person('Alice', 30)
p.greet()
```

## Instance vs class attributes
- Instance attributes are unique per object (`self.x`).
- Class attributes are shared across all instances.

## Encapsulation and private attributes
Use a leading underscore `_` to signal internal attributes; name mangling `__attr` for stronger privacy.

## Tips
- Keep classes small and focused.
- Favor composition over inheritance when appropriate.
- Use dataclasses (`@dataclass`) for simple data containers (Python 3.7+).

## Exercise
- Create a `BankAccount` class with deposit, withdraw, and balance-checking methods. Handle overdraft with exceptions.