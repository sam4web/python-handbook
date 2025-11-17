---
title: Threading & Multiprocessing
description: Understand concurrency options in Python, threading for I/O-bound work and multiprocessing for CPU-bound tasks.
---

# Threading vs Multiprocessing
Python has several concurrency models; choose based on workload characteristics.

## Threading (I/O-bound)
```python filename="threading_example.py"
import threading

def worker(n):
    print('Working', n)

threads = [threading.Thread(target=worker, args=(i,)) for i in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()
```

## Multiprocessing (CPU-bound)
```python
from multiprocessing import Pool

def f(x):
    return x*x

with Pool(4) as p:
    print(p.map(f, [1,2,3,4]))
```

## Tips
- Be aware of GIL: threads don't speed up CPU-bound pure Python code.
- Use multiprocessing or native extensions for CPU heavy tasks.

## Exercise
- Implement a parallel file downloader using threads and compare performance with a sequential version.
