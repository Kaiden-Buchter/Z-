import Parser from "./frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { MK_BOOL, MK_NULL, MK_NUMBER } from "./runtime/values.ts";
repl();

function repl() {
  const parser = new Parser();
  const env = new Environment();
  env.declareVar("x", MK_NUMBER(100));
  env.declareVar("true", MK_BOOL(true));
  env.declareVar("false", MK_BOOL(false));
  env.declareVar("null", MK_NULL());
  console.log("\nRepl v0.1");

  // Continue Repl until user stops or types `exit`
  while (true) {
    const input = prompt("> ");
    // Check for no user input or exit keyword
    if (!input || input.includes("exit")) {
      console.log("Exiting repl...");
      Deno.exit(0);
    }

    // Produce AST from source code
    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);
  }
}
