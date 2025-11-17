---
title: For Loops & Iteration
description: Learn to iterate over sequences, use range(), and loop control statements like break and continue.
---
# For Loops and Iteration
`for` loops iterate over items of a sequence (like lists, strings, tuples) or any iterable object.

## Basic for loop
```python filename="for_example.py"
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)
```

## Using range()
```python
for i in range(5):      # 0..4
    print(i)
for i in range(2, 10, 2):  # start, stop, step
    print(i)
```

## Loop control
- `break` exits the loop early.
- `continue` skips to the next iteration.
- `else` on loops runs when the loop completes normally (no break).

## Tips
- Prefer iterating directly over items instead of using indices where possible.
- When performance matters and the sequence is large, consider generator expressions.

## Exercises
- Find the first number divisible by 7 in a list using a loop and `break`.
- Use a loop `else` to detect if a value wasn't found.
```