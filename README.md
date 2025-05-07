🐚 Custom Node.js Shell

This is a simple interactive shell (REPL) built with Node.js that mimics basic Unix shell behavior. It supports a few shell builtins and can execute external programs by resolving them from your system's PATH.
🚀 Features

    ✅ Simple prompt ($ )

    ✅ Shell builtins:

        echo – prints input

        exit – exits the shell (exit 0)

        builtins – lists available shell builtins

        type – tells whether a command is a builtin or a system binary

    ✅ Executes external commands found in the system PATH

    ✅ Error handling if a command is not found

🧠 How It Works

    Uses Node’s built-in modules:
    readline, child_process, fs, and path

    Listens for user input via readline

    Tries to match input to a shell builtin

    If not a builtin, it checks if the command exists in any PATH directory

    If found, it spawns the command as a subprocess with child_process.spawn

🔧 Example Usage

$ builtins
builtins, echo, exit, type

$ echo Hello world!
Hello world!

$ type echo
echo is a shell builtin

$ type ls
ls is /bin/ls

$ ls
(file list output)

$ exit 0

# Shell exits

🛠️ Setup & Run

    Ensure you have Node.js installed.

    Save the script in a file, e.g., shell.js

    Run it using:

node shell.js

📂 Project Structure

    createInterface – for handling line input/output

    spawn – to run external commands

    readdirSync – to search for executables in system PATH

    shell object – contains custom builtins

    execute() – runs external commands with arguments

    type() – resolves command types (builtin vs binary)

📌 Notes

    This is a basic educational shell—there's no piping, redirection, or history.

    Intended as a learning project to explore how shells and command execution work.

🧠 Learning Goals

    Understanding how PATH resolution works

    Using child_process.spawn to execute real programs

    Creating a REPL environment with readline

    Building a modular command handling system

📚 Inspired by

Unix shell environments and educational tools like:

    Bash

    Fish shell

    Node.js system module docs

🪄 Next Steps / Ideas

    Add history (up/down arrows)

    Implement tab completion

    Add piping (|) and redirection (>, <)

    Support chaining (&&, ||)
