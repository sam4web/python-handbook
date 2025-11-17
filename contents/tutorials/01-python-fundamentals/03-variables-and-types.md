---
title: Variables and Data Types
description: Learn how to declare variables, understand Python's dynamic typing, and use basic data types like strings, integers, floats, and booleans.
---
# Variables and Data Types
Variables hold values your program works with. In Python, variables are created when you assign a value to them—no explicit declaration required.
Python is *dynamically typed*, meaning the interpreter tracks the data type automatically at runtime.

## Common Data Types
- `str` — text (strings)
- `int` — integers (whole numbers)
- `float` — floating-point numbers (decimals)
- `bool` — boolean values (`True`, `False`)

## Examples
```python filename="variables.py"
name = "Alice"         # str
age = 30               # int
height = 5.9           # float
is_active = True       # bool
print(name, age, height, is_active)
```

## Type inspection and conversion
```python
print(type(name))      # <class 'str'>
age_str = str(age)     # "30"
int("42")              # 42
float("3.14")          # 3.14
```

## Best practices
- Use descriptive names (`first_name` instead of `fn`).
- Follow `snake_case` for variable names.
- Avoid using Python keywords (e.g., `for`, `if`) as variable names.
- Prefer immutable types for values that shouldn't change (e.g., strings, tuples).

## Common pitfalls
- Forgetting to initialize a variable before use causes `NameError`.
- Mixing tabs and spaces for indentation can cause `IndentationError`.

## Exercise
- Create variables that store your name, birth year, and favorite color. Print a sentence that includes these values.