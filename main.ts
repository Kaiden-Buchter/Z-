import Parser from "./frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { MK_BOOL, MK_NULL } from "./runtime/values.ts";
repl();

function repl() {
  const parser = new Parser();
  const env = new Environment();

  // Create default global environment
  env.declareVar("true", MK_BOOL(true), true);
  env.declareVar("false", MK_BOOL(false), true);
  env.declareVar("null", MK_NULL(), true);

  // Initial Repl
  console.log("Welcome to the Z- Programming Language!\n");
  console.log("Repl v0.1");
  console.log("Type `help` for help\n");

  // Continue Repl until user stops or types `exit`
  while (true) {
    const input = prompt(">> ");
    // Check for no user input or exit keyword
    if (!input || input.includes("exit")) {
      console.log("Exiting Repl...");
      Deno.exit(0);
    }

    if (!input || input.includes("help")) {
      console.log("\n   Help Menu   \n");
      console.log("exit - Exit Repl");
      console.log("help - Help Menu");
      console.log("about - About Z- Programming Language");
      console.log("clear - Clear Repl Console");
      console.log("env - Print Environment");
      console.log("anything else - Evaluate Expression");
      console.log("\n  File System   \n");
      console.log("write - Write to file");
      console.log("delete - Delete file");
      console.log("make - Make file")
      console.log("rename - Rename file");
      console.log("clone - Clone file");
      console.log("show - Show file");
      console.log("ls - List files");
      console.log("\n  Directory System   \n");
      console.log("cd - Change directory");
      console.log("pwd - Print working directory");
      console.log("mkdir - Make directory");
      console.log("rmdir - Remove directory");
      console.log("\n Info \n");
      console.log(
        "Note: The repl is not perfect and may crash if you type something wrong."
      );
      console.log("If this happens, just restart the repl.");
      console.log("\n");
      continue;
    }

    if (!input || input.includes("clear")) {
      console.clear();
      continue;
    }

    if (!input || input.includes("env")) {
      console.log("\n   Environment   \n");
      console.log(env);
      continue;
    }

    if (!input || input.includes("about")) {
      console.log("\n   About   \n");
      console.log("Z- is a programming language created by Kaiden Buchter.");
      console.log("It is a work in progress and is not yet complete.");
      console.log(
        "The source code is available at https://github.com/Kaiden-Buchter/Z-"
      );
      continue;
    }

    if (!input || input.includes("write")) {
      console.log("\n   Write   \n");
      const fileName = prompt("File Name: ");
      const file = Deno.openSync(fileName!, { write: true, create: true });
      const encoder = new TextEncoder();
      const input = prompt("Input: ");
      const text = input;
      const data = encoder.encode(text!);
      Deno.writeSync(file.rid, data);
      Deno.close(file.rid);
      continue;
    }

    if (!input || input.includes("delete")) {
      console.log("\n   Delete   \n");
      const fileName = prompt("File Name: ");
      Deno.removeSync(fileName!);
      continue;
    }

    if (!input || input.includes("make")) {
      console.log("\n   Make   \n");
      const fileName = prompt("File Name: ");
      Deno.createSync(fileName!);
      continue;
    }

    if (!input || input.includes("rename")) {
      console.log("\n   Rename   \n");
      const fileName = prompt("File Name: ");
      const newFileName = prompt("New File Name: ");
      Deno.renameSync(fileName!, newFileName!);
      continue;
    }

    if (!input || input.includes("clone")) {
      console.log("\n   Clone   \n");
      const fileName = prompt("File Name: ");
      const newFileName = prompt("New File Name: ");
      Deno.copyFileSync(fileName!, newFileName!);
      continue;
    }

    if (!input || input.includes("show")) {
      console.log("\n   Show   \n");
      const fileName = prompt("File Name: ");
      const file = Deno.openSync(fileName!, { read: true });
      const decoder = new TextDecoder("utf-8");
      const data = Deno.readAllSync(file);
      const text = decoder.decode(data);
      console.log(text);
      Deno.close(file.rid);
      continue;
    }

    if (!input || input.includes("ls")) {
      console.log("\n   List   \n");
      const files = Deno.readDirSync(".");
      for (const file of files) {
        console.log(file.name);
      }
      continue;
    }

    if (!input || input.includes("cd")) {
      console.log("\n   Change Directory   \n");
      const dir = prompt("Directory: ");
      Deno.chdir(dir!);
      continue;
    }

    if (!input || input.includes("pwd")) {
      console.log("\n   Print Working Directory   \n");
      console.log(Deno.cwd());
      continue;
    }

    if (!input || input.includes("mkdir")) {
      console.log("\n   Make Directory   \n");
      const dir = prompt("Directory: ");
      Deno.mkdirSync(dir!);
      continue;
    }

    if (!input || input.includes("rmdir")) {
      console.log("\n   Remove Directory   \n");
      const dir = prompt("Directory: ");
      Deno.removeSync(dir!, { recursive: true });
      continue;
    }

    // Produce AST from source code
    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);
  }
}
