export type NodeTypes =
  | "Program"
  | "NumericLiteral"
  | "Identifier"
  | "BinaryExpr"

// Statements will not return a value (let x = 45)
// Expresions will return a value (x + 45)

export interface Stmt {
    kind: NodeTypes
}

export interface Program extends Stmt {
    kind: "Program",
    body: Stmt[];
}

export interface Expr extends Stmt {}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr",
    left: Expr,
    right: Expr,
    operator: string
}

export interface Identifier extends Expr {
    kind: "Identifier",
    symbol: string
}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral",
    value: number
}