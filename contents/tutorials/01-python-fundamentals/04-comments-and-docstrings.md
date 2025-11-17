---
title: Comments and Docstrings
description: Use comments to document code and docstrings to document modules, classes, and functions.
---
# Comments and Docstrings
Writing clear comments and documentation makes code easier to understand and maintain. Comments are for developers; docstrings can be accessed programmatically.

## Single-line comments
Use `#` to write a comment on a single line:
```python
# This is a comment
print('Hello')  # inline comment
```

## Multi-line comments / docstrings
Use triple quotes for multi-line strings, commonly used as docstrings:
```python
def greet(name):
    """Return a greeting for the given name.

    Args:
        name (str): The name to greet.
    """
    return f'Hello, {name}'
```

Docstrings appear as the `__doc__` attribute for modules, classes, and functions. Tools like Sphinx can extract them to build documentation.

## Tips
- Do not write obvious comments (e.g., `i += 1  # add one`), prefer explaining *why* something is done.
- Keep docstrings concise but informative.
- Follow PEP 8 guidelines for docstring formatting if you plan to publish packages.

## Exercise
- Add a docstring to a function that computes the factorial of a number and test `help()` on it.