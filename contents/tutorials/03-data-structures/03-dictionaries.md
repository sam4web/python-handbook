---
title: Dictionaries
description: Work with associative arrays (maps) using Python dicts, creation, access, iteration, and common patterns.
---
# Dictionaries: Key-Value Mappings
Dictionaries map keys to values and are optimized for fast lookup by key.

## Creating dicts
```python
d = {'name': 'Alice', 'age': 30}
d2 = dict(name='Bob', age=25)
```

## Accessing values
```python
print(d['name'])        # KeyError if missing
print(d.get('phone'))   # None if missing, or provide default: d.get('phone', 'N/A')
```

## Iteration
```python
for k in d:
    print(k, d[k])
for k, v in d.items():
    print(k, v)
```

## Useful methods
- `keys()`, `values()`, `items()`
- `pop(key)`, `popitem()`, `update(other)`
- `setdefault(key, default)`

## Tips
- Use `defaultdict` from `collections` for automatic defaults.
- When order matters, Python 3.7+ preserves insertion order in dicts.

## Exercise
- Count word frequencies in a text using a dictionary.
