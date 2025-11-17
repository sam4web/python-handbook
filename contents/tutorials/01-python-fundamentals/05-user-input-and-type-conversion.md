---
title: User Input & Type Conversion
description: Read input from users and convert input strings to numeric types safely.
---
# User Input and Type Conversion
Interactive programs often require user input. In Python, `input()` reads a line from the user and returns it as a string.

## Basic input
```python filename="input_example.py"
name = input('What is your name? ')
print(f'Hello, {name}')
```

## Converting types
Since `input()` returns a string, convert to numeric types when needed:
```python
age = int(input('Enter your age: '))
height = float(input('Enter your height in meters: '))
```
Handle errors using try/except to avoid crashes for invalid input.

## Validation example
```python
while True:
    raw = input('Enter a whole number: ')
    try:
        num = int(raw)
        break
    except ValueError:
        print('Please enter a valid integer.')
```

## Tips & Pitfalls
- Always validate user input in real applications.
- Use `strip()` to remove leading/trailing whitespace if needed.
- Consider using libraries (like `click` or `argparse`) for CLI tools.

## Exercise
- Build a program that asks the user for two numbers and prints their sum, difference, product, and quotient (handle division by zero).