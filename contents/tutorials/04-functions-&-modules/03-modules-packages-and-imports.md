---
title: Modules & Packages
description: Structure Python code into modules and packages, and learn how to import them cleanly.
---
# Modules, Packages, and Imports
Modules are .py files; packages are directories with `__init__.py` (optional in recent Python versions).

## Importing
```python
import math
from math import sqrt, pi
import package.module as mod
```

## Creating your own module
- Create `mymodule.py` with functions and import it in another script.
- Use `if __name__ == '__main__':` to make code runnable as a script or importable as a module.

## Packaging for distribution
- Use `pyproject.toml` or `setup.py` to define package metadata.
- Publish to PyPI with `twine` after building distributions.

## Tips
- Keep modules small and focused.
- Avoid circular imports.
- Use virtual environments to manage dependencies.

## Exercise
- Create a small package with a module that exposes a greeting function. Install it into a virtual environment using `pip install -e .`.