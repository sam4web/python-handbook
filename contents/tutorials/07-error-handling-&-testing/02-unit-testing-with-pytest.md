---
title: pytest Basics
description: Write tests using pytest, assert behavior, and run test suites to ensure code correctness.
---
# Unit Testing with pytest
Testing improves reliability. `pytest` is a popular testing framework that's easy to start with.

## Installing pytest
```bash
pip install pytest
```

## Writing a test
Create `test_math.py`:
```python filename="test_math.py"
from mymodule import add
def test_add():
    assert add(2,3) == 5
```

## Running tests
```bash
pytest -q
```

## Tips
- Use fixtures for setup/teardown.
- Test edge cases and expected failures.
- Integrate tests into CI pipelines.

## Exercise
- Write tests for a `BankAccount` class, covering deposit, withdraw, and overdraft scenarios.