---
title: Try Except
description: Handle runtime errors gracefully.
---
try:
    x = 1 / 0
except ZeroDivisionError:
    print("Error")