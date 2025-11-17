---
title: Packaging & Distribution
description: Convert your project into a distributable package, using pyproject.toml and publishing to PyPI.
---
# Packaging Your Python Project
Packaging makes it easy for others to install and use your code.

## Modern packaging (pyproject.toml)
Use tools like Poetry or setuptools with `pyproject.toml` to define metadata and dependencies.

## Building and publishing
```bash
python -m build
python -m twine upload dist/*
```

## Tips
- Test your package in a virtual environment before publishing.
- Include a clear README and license file.

## Exercise
- Package a small utility and install it locally with `pip install .`