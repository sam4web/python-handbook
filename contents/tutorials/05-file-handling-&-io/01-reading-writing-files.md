---
title: File I/O
description: Read and write text and binary files, understand file modes and best practices like using context managers.
---
# Reading and Writing Files
File handling is essential for many programs. Use `open()` with context managers to safely handle files.

## Reading a file
```python filename="read_file.py"
with open('data.txt', 'r', encoding='utf-8') as f:
    contents = f.read()
print(contents)
```

## Writing a file
```python
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write('Hello, file!')
```

## Appending
```python
with open('output.txt', 'a') as f:
    f.write('
New line')
```

## Binary files
Use `'rb'` and `'wb'` modes for binary data (images, serialized bytes).

## Tips
- Always use `with` to ensure files are closed automatically.
- Use `pathlib.Path` for path manipulations instead of os.path for cleaner code.

## Exercise
- Write a program that reads a CSV file and prints the number of rows and columns.