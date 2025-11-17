---
title: Asyncio Intro
description: Use async/await for concurrency in I/O-bound applications and integrate with frameworks like FastAPI.
---
# Asyncio: Asynchronous Programming
`asyncio` allows cooperative multitasking using `async` functions and `await` for non-blocking operations.

## Example
```python filename="async_example.py"
import asyncio

async def say_after(delay, msg):
    await asyncio.sleep(delay)
    print(msg)

async def main():
    await asyncio.gather(say_after(1, 'hello'), say_after(2, 'world'))

asyncio.run(main())
```

## Tips
- Use `async` for I/O-bound workloads (network, disk I/O).
- Avoid mixing blocking calls in async code; use thread executors for blocking tasks.

## Exercise
- Create an async function that concurrently fetches multiple URLs using `aiohttp`.