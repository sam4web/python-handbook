---
title: Inheritance & Polymorphism
description: Extend classes to reuse behavior and implement polymorphic interfaces for flexible code.
---
# Inheritance and Polymorphism
Inheritance lets a class derive properties from another class. Polymorphism allows treating different classes through the same interface.

## Example
```python filename="inheritance.py"
class Animal:
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return 'Bark'

class Cat(Animal):
    def speak(self):
        return 'Meow'

animals = [Dog(), Cat()]
for a in animals:
    print(a.speak())
```

## Tips
- Use abstract base classes (`abc` module) to define interfaces.
- Avoid deep inheritance hierarchies; prefer composition if design gets complex.

## Exercise
- Implement a shape hierarchy (Shape, Rectangle, Circle) with an area method for each.