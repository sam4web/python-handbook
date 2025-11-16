---
title: Arguments
description: Default, keyword, and variable-length arguments.
---
def connect(host="localhost", port=8080):
    return host, port

def add(*nums):
    return sum(nums)

def config(**settings):
    return settings