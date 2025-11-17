---
title: match / case
description: Python's structural matching to branch on shapes of data (introduced in Python 3.10).
---
# Structural Pattern Matching (match / case)
`match` provides a concise way to destructure and match on patterns (like switch/case in other languages but more powerful).

## Example
```python filename="match_example.py"
def http_status(status):
    match status:
        case 200:
            return 'OK'
        case 404:
            return 'Not Found'
        case _:
            return 'Other'
```

## Pattern examples
- Literal patterns: `case 1:`
- Capture patterns: `case x:`
- Sequence patterns: `case [x, y]:`
- Mapping patterns: `case {"type": t, "value": v}:`

## Tips
- Use match for complex branching on data shapes.
- Keep patterns readable; don't overuse for simple conditions.

## Exercise
- Build a function that interprets simple arithmetic expressions represented as lists, e.g., `['add', 2, 3]`.