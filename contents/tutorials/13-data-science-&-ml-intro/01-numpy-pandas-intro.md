---
title: NumPy & Pandas Intro
description: Basics of NumPy arrays and Pandas DataFrames for numerical computation and data analysis.
---
# Intro to NumPy and Pandas
NumPy provides efficient arrays; Pandas adds high-level table-like structures for analysis.

## NumPy example
```python filename="numpy_example.py"
import numpy as np
arr = np.array([1,2,3])
print(arr * 2)
```

## Pandas example
```python filename="pandas_example.py"
import pandas as pd
df = pd.DataFrame({'a':[1,2], 'b':[3,4]})
print(df.describe())
```

## Tips
- Use vectorized operations for performance.
- Learn indexing and selection methods in Pandas early on.

## Exercise
- Load a CSV into Pandas and compute basic statistics (mean, median) for numeric columns.