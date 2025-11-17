---
title: Defining Functions
description: How to define functions with `def`, pass arguments, and call them. Includes scope and best practices.
---
# Defining and Calling Functions
Functions group logic into reusable pieces. Define a function using `def`, then call it by name.

## Basic function
```python filename="functions.py"
def greet(name):
    return f'Hello, {name}!'
print(greet('Alice'))
```

## Parameters and arguments
- Positional arguments
- Keyword arguments
- Default values: `def f(x=10):`
- Variable-length: `*args`, `**kwargs`

## Return values
Functions can return a value with `return`. Without `return`, they return `None`.

## Scope: local vs global
Use local variables inside functions. Avoid modifying globals unless necessary.

## Tips & Best practices
- Keep functions focused (single responsibility).
- Use docstrings to describe behavior and parameters.
- Name functions clearly using verbs (e.g., `calculate_total`).

## Exercise
- Implement a function that computes the factorial of a number using recursion and another using iteration. Compare their behavior.