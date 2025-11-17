---
title: Sets
description: Learn about sets for membership testing, deduplication, and set operations like union and intersection.
---
# Sets: Unordered Collections of Unique Items
Sets are great when you need uniqueness and fast membership tests.

## Creating sets
```python
s = {1, 2, 3}
s2 = set([1,2,2,3])
```

## Common operations
- `add(x)`, `remove(x)`, `discard(x)`
- `union()`, `intersection()`, `difference()`, `symmetric_difference()`
- `in` for membership test is very fast (average O(1))

## Example
```python
a = {1,2,3}
b = {3,4,5}
print(a & b)  # {3}
print(a | b)  # {1,2,3,4,5}
```

## Tips
- Sets are unordered; no indexing.
- Use frozenset for an immutable, hashable set (can be dict keys).

## Exercise
- Remove duplicates from a list while preserving order (hint: use a dict or OrderedDict for order preservation).