---
title: Installing Python
description: How to install Python on Windows, macOS, and Linux, plus selecting an editor and running your first script.
---
# Installing Python and Setting Up Your Environment
This guide helps you install Python and set up a basic development environment. It includes recommended editors, how to check your installation, and platform-specific tips.

## Checking if Python is installed
Open a terminal and run:
```bash
python3 --version
```
or
```bash
python --version
```
If you see a version like `Python 3.x.y`, Python is installed.

## Downloading Python
Visit https://www.python.org/downloads/ and choose the installer for your OS.
- Windows: use the executable installer and check "Add Python to PATH" during setup.
- macOS: use the macOS installer package or install via Homebrew (`brew install python`).
- Linux: many distributions include Python; use your package manager (e.g., `sudo apt install python3`).

## Choosing an editor / IDE
- Visual Studio Code (lightweight, powerful extensions for Python)
- PyCharm (full-featured IDE, great for larger projects)
- Sublime Text / Atom for lighter editing
- Use built-in IDLE for quick tests

## Creating a virtual environment
Virtual environments isolate dependencies per project:
```bash
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate    # Windows PowerShell or CMD
```
Install packages using `pip` while the venv is active.

## Running your first script
Save a file `test.py`:
```python
print("Python is installed and working!")
```
Run it: `python3 test.py`

## Troubleshooting
- If `python3` isn't found, try `python`.
- On Windows, ensure "Add to PATH" was selected during installation.
- If you need multiple Python versions, consider pyenv (macOS/Linux) or the Windows Python Launcher.

## Exercise
- Install Python and run a one-line script that prints system information: platform and version.