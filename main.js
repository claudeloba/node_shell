const { createInterface } = require("node:readline");
const { spawn } = require("node:child_process");
const { readdirSync } = require("node:fs");
const path = require("node:path");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

function findFilesInPaths(command) {
  const paths = process.env.PATH.split(path.delimiter);

  for (let dir of paths) {
    if (!dir) {
      continue;
    }
    const files = readdirSync(dir);
    if (files.includes(command)) {
      return path.join(dir, command);
    }
    return command;
  }
}

function type(input) {
  if (input in shell) {
    console.log(`${input} is a shell builtin`);
    return;
  }

  const foundFile = findFilesInPaths(input);

  if (foundFile) {
    console.log(`${input} is ${foundFile}`);
  } else {
    console.log(`${input}: command not found`);
  }
}

const shell = {
  echo: (input) => console.log(input),
  exit: (input) => {
    if (input === "0") {
      rl.close();
    }
  },
  type,
};

function execute(commandPath, argsString) {
  const argumentsArray = argsString === "" ? [] : argsString.split(" ");
  const command = findFilesInPaths(commandPath);

  rl.pause();

  const childProcess = spawn(command, argumentsArray, {
    stdio: "inherit",
  });

  childProcess.on("error", (error) => {
    process.stdout.write(`${command}: command not found\n`);
  });

  childProcess.on("close", () => {
    rl.resume();
    rl.prompt();
  });
}

rl.prompt();
rl.on("line", (line) => {
  const trimmed = line.trimStart();
  const firstSpace = trimmed.indexOf(" ");

  let command, args;
  if (firstSpace === -1) {
    command = trimmed;
    args = "";
  } else {
    command = trimmed.slice(0, firstSpace);
    args = trimmed.slice(firstSpace + 1);
  }

  if (command in shell) {
    shell[command](args);
    rl.prompt();
  } else {
    execute(command, args);
  }
}).on("close", () => {
  console.log("Bye!");
  process.exit(0);
});
