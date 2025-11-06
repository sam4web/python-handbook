const pythonTemplates = [
  {
    name: "Hello World",
    code: 'print("Hello, World!")',
  },
  {
    name: "Basic Variables & F-String",
    code: 'user_name = "Alice"\nuser_age = 30\nprint(f"{user_name} is {user_age} years old.")',
  },
  {
    name: "If/Else Statement",
    code: 'score = 85\n\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C")',
  },
  {
    name: "Basic Function Definition",
    code: 'def calculate_area(width, height):\n    return width * height\n\narea = calculate_area(10, 5)\nprint(f"The area is: {area}")',
  },
  {
    name: "For Loop (List Iteration)",
    code: 'items = ["apple", "banana", "cherry"]\nfor item in items:\n    print(f"I have a {item}.")',
  },
  {
    name: "While Loop (Counter)",
    code: 'count = 0\nwhile count < 3:\n    print(f"Count is {count}")\n    count += 1',
  },
  {
    name: "Try/Except (Error Handling)",
    code: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Error: Cannot divide by zero!")\nexcept Exception as e:\n    print(f"An unexpected error occurred: {e}")',
  },
  {
    name: "List Comprehension",
    code: "numbers = [1, 2, 3, 4, 5, 6]\nsquared_evens = [n * n for n in numbers if n % 2 == 0]\nprint(squared_evens) # Output: [4, 16, 36]",
  },
  {
    name: "Basic Class Structure",
    code: 'class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n\n    def bark(self):\n        return f"{self.name} says woof!"\n\nmy_dog = Dog("Rex", "German Shepherd")\nprint(my_dog.bark())',
  },
  {
    name: "Main Execution Block (`if __name__`)",
    code: 'def main():\n    print("Running the main program...")\n\nif __name__ == "__main__":\n    main()',
  },
];

export default pythonTemplates;
