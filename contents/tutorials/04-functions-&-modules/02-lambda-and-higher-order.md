---
title: Lambda & Higher-Order Functions
description: Use anonymous functions (lambda) and pass functions as arguments (map, filter, reduce).
---
# Lambda Functions and Higher-Order Functions
Lambda functions are small anonymous functions useful for short operations.

## Lambda syntax
```python
square = lambda x: x*x
print(square(5))  # 25
```

## Higher-order functions
- `map(func, iterable)` applies a function to each item
- `filter(func, iterable)` filters items by predicate
- `functools.reduce(func, iterable)` reduces to a single value

```python
nums = [1,2,3,4]
print(list(map(lambda x: x*2, nums)))
print(list(filter(lambda x: x%2==0, nums)))
```

## Tips
- Prefer named functions for complex logic; lambdas are for short, simple operations.
- Use list comprehensions when they are clearer than map/filter.

## Exercise
- Use `map` and `filter` to compute squares of even numbers from a list.