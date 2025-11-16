---
title: WebSocket Basics (Python)
description: Simple WebSocket echo server using websockets module.
---
import asyncio
import websockets

async def echo(websocket):
    async for message in websocket:
        await websocket.send(f"Echo: {message}")

asyncio.run(websockets.serve(echo, "localhost", 8765))