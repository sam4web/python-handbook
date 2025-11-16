---
title: I/O Functions
description: Built-in functions for input/output operations.
kind: function
---
# print()
print("Hello World")

# input()
name = input("Enter name: ")

# format()
msg = "Hello {}".format(name)

# open()
with open("file.txt", "r") as f:
    data = f.read()