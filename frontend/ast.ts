// -----------------------------------------------------------
// ---------------          AST TYPES          ---------------
// ---     Defines the structure of our Languages AST      ---
// -----------------------------------------------------------

// Define the possible types of nodes in the AST (Abstract Syntax Tree)
// Each type corresponds to a different kind of operation or value in the program
export type NodeTypes =
  // Statements
  | "Program" // Represents the entire program
  | "VarDeclaration" // Represents a variable declaration (e.g., let x = 45)
  // Expressions
  | "AssignmentExpr" // Represents an assignment expression (e.g., x = 45)
  | "NumericLiteral" // Represents a numeric literal (e.g., 1, 2, 3)
  | "Identifier" // Represents an identifier (e.g., variable name)
  | "BinaryExpr"; // Represents a binary expression (e.g., a + b)

// Statements are operations that do something but do not produce a value
// For example, a variable declaration (let x = 45) is a statement
export interface Stmt {
  kind: NodeTypes; // The type of the node
}

// A Program node represents the entire program. It contains a body which is a list of statements
export interface Program extends Stmt {
  kind: "Program"; // The type of the node
  body: Stmt[]; // The list of statements in the program
}

// A VarDeclaration node represents a variable declaration. It contains a body which is a list of statements
export interface VarDeclaration extends Stmt {
  kind: "VarDeclaration"; // The type of the node
  constant: boolean; // Whether the variable is a constant
  identifier: string; // The identifier (e.g., variable name)
  value?: Expr; // The value of the variable (e.g., 45)
}

// Expressions are operations that produce a value
// For example, an arithmetic operation (x + 45) is an expression
// deno-lint-ignore no-empty-interface
export interface Expr extends Stmt {}

export interface AssignmentExpr extends Expr {
  kind: "AssignmentExpr"; // The type of the node
  assigne: Expr; // The left-hand side of the expression
  value: Expr; // The right-hand side of the expression
}

// A BinaryExpr node represents a binary expression. It contains a left and right expression and an operator
export interface BinaryExpr extends Expr {
  kind: "BinaryExpr"; // The type of the node
  left: Expr; // The left-hand side of the expression
  right: Expr; // The right-hand side of the expression
  operator: string; // The operator (e.g., +, -, *, /)
}

// An Identifier node represents an identifier (e.g., variable name)
export interface Identifier extends Expr {
  kind: "Identifier"; // The type of the node
  symbol: string; // The name of the identifier
}

// A NumericLiteral node represents a numeric literal
export interface NumericLiteral extends Expr {
  kind: "NumericLiteral"; // The type of the node
  value: number; // The value of the numeric literal
}