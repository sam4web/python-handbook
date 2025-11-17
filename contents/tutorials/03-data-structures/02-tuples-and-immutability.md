---
title: Tuples & Immutability
description: Understand tuples, when to use them, and why immutability matters.
---
# Tuples and Immutability
Tuples are ordered, immutable sequences — once created, their contents cannot change. They are useful for fixed collections of items.

## Creating tuples
```python
t = (1, 2, 3)
singleton = (5,)   # note trailing comma
```

## Use cases
- Represent fixed records (e.g., coordinates `(x, y)`).
- Return multiple values from a function.
- Keys in dictionaries (tuples are hashable if they contain only hashable items).

## Unpacking
```python
x, y = (10, 20)
```

## Tips
- Use tuples to signal immutability and for small records.
- Convert between list and tuple with `list()` and `tuple()` when necessary.

## Exercise
- Write a function that swaps the first and last elements of a tuple and returns a new tuple.