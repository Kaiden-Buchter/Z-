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
      console.log("write - Write to file");
      console.log("anything else - Evaluate Expression");
      console.log("\n");
      console.log("Note: The repl is not perfect and may crash if you type something wrong.");
      console.log("If this happens, just restart the repl.");
      console.log("\n")
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
      console.log("The source code is available at https://github.com/Kaiden-Buchter/Z-");
      continue;
    }

    if (!input || input.includes("write")) {
      console.log("\n   Write   \n");
      const fileName = prompt("File Name: ");
      const file = Deno.openSync(fileName!, { write: true, create: true });
      const encoder = new TextEncoder();
      const input = prompt("Input: ");
      const text = input
      const data = encoder.encode(text!);
      Deno.writeSync(file.rid, data);
      Deno.close(file.rid);
      continue;
    }

    // Produce AST from source code
    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);
  }
}


