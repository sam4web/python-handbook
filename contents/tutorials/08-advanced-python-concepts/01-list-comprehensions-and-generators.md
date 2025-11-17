---
title: List Comprehensions & Generators
description: Use comprehensions for concise list creation and generators for memory efficient iteration.
---
# List Comprehensions and Generators
List comprehensions provide concise syntax for creating lists; generators produce values lazily.

## List comprehension
```python
squares = [x*x for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
```

## Generator expression
```python
gen = (x*x for x in range(10))
for val in gen:
    print(val)
```

## Generator functions
```python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a+b
```

## Tips
- Use generators when processing large data streams.
- Don't reuse exhausted generators; recreate if needed.

## Exercise
- Implement a generator that reads a large file and yields lines containing a given keyword.