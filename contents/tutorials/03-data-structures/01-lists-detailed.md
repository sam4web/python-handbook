---
title: Lists (Detailed)
description: Deep dive into lists, creation, indexing, slicing, methods, and performance considerations.
---
# Lists: Ordered, Mutable Collections
Lists are one of the most used collection types in Python because they are flexible and easy to work with.

## Creating lists
```python
a = []                # empty list
nums = [1, 2, 3, 4]
mixed = [1, 'two', 3.0]
```

## Accessing elements
```python
first = nums[0]
last = nums[-1]
slice = nums[1:3]  # from index 1 up to (but not including) 3
```

## Common methods
- `append(x)` — add item to end
- `extend(iterable)` — extend with items from iterable
- `insert(i, x)` — insert before index i
- `pop(i)` — remove and return item at index
- `remove(x)` — remove first occurrence of x
- `clear()` — empty the list
- `sort()` / `sorted()` — sort in place or return a new sorted list

## List comprehensions
```python
squares = [x*x for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
```

## Performance notes
- Appending is amortized O(1).
- Inserting/removing at the beginning is O(n).
- For large datasets, consider `array` module or NumPy arrays for numeric data.

## Exercises
- Flatten a list of lists.
- Create a list comprehension to extract vowels from a string.
