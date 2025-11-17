---
title: Conditional Statements
description: Learn how to control program flow using conditions and branching logic.
---
# Conditional Statements: if, elif, else
Conditional statements let your program make decisions. Based on a condition, different code blocks run.

## Basic structure
```python
if condition:
    # executed when condition is True
elif other_condition:
    # executed when the first is False and this is True
else:
    # executed when all above are False
```

## Example
```python filename="conditions.py"
score = 78
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'
print('Grade:', grade)
```

## Boolean expressions
Use comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) and logical operators (`and`, `or`, `not`).

## Tips
- Keep conditions clear and simple.
- Avoid deeply nested ifs; extract logic into functions for clarity.
- Use short-circuiting behavior with `and`/`or` to protect code (e.g., `if obj and obj.attr:`).

## Exercises
- Write a function `classify_age(age)` that returns 'child', 'teen', 'adult', or 'senior'.