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
      console.log("clear - Clear Repl");
      
      continue;
    }

    if (!input || input.includes("clear")) {
      console.clear();
      continue;
    }

    // Produce AST from source code
    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);
  }
}


