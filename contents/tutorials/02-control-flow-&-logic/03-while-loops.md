---
title: While Loops
description: Repeat actions until a condition changes; good for indefinite iteration based on runtime state.
---
# While Loops
`while` loops continue as long as a condition remains true.

## Example
```python filename="while_example.py"
count = 0
while count < 5:
    print(count)
    count += 1
```

## Avoid infinite loops
Ensure the loop condition will eventually become false. Use `break` judiciously for safety.

## Practical use-case: input validation
```python
while True:
    name = input('Enter name: ').strip()
    if name:
        break
    print('Name cannot be empty.')
```

## Tips
- Prefer `for` loops when you know the number of iterations.
- Always validate loop exit conditions to avoid hung programs.

## Exercise
- Implement a number guessing game using `while` with a limited number of attempts.