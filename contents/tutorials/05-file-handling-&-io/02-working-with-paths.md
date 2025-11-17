---
title: Path Handling
description: Use pathlib for path manipulation across platforms and manage file/directory operations.
---
# Working with Paths
`pathlib` provides an object-oriented API for filesystem paths.

## Example
```python
from pathlib import Path
p = Path('data')
p.mkdir(exist_ok=True)
file = p / 'notes.txt'
file.write_text('Hello')
print(file.read_text())
```

## Tips
- Use `Path.home()` to access the user's home directory.
- Avoid building paths with string concatenation; use `/` operator with Path objects.

## Exercise
- Create a script that lists all `.py` files in a directory recursively.