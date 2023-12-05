// Let x = 45 + ( foo * bar )
// [ LetToken, IdentifierToken, EqualToken, NumberToken]

export enum TokenType {
    Number, // 1, 2, 3
    Identifier, // x, y, z
    Equals, // =
    OpenParen, // (
    CloseParen, // )
    BinaryOperator, // +, -, *, /
    Let, // let
}

const KEYWORDS: Record<string, TokenType> = {
    "let": TokenType.Let,
}

export interface Token {
    value: string,
    type: TokenType,
}

function token(value = "", type: TokenType): Token {
    return { value, type };
}

function isalpha(src: string) {
    return src.toUpperCase() != src.toLowerCase();
}

function isskippable(src: string) {
    return src == " " || src == "\n" || src == "\t";
}

function isint(src: string) {
    const c = src.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

export function tokenize(sourceCode: string): Token[] {
    const tokens: Token[] = [];
    const src = sourceCode.split("");

    // Build each token until end of file
    while (src.length > 0) {
        if (src[0] == "(") {
            tokens.push(token(src.shift(), TokenType.OpenParen))
        } else if (src[0] == ")") {
            tokens.push(token(src.shift(), TokenType.CloseParen))
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/") {
            tokens.push(token(src.shift(), TokenType.BinaryOperator))
        } else if (src[0] == "=") {
            tokens.push(token(src.shift(), TokenType.Equals))
        } else {
            // Handler multi-character tokens

            // Build number token
            if (isint(src[0])) {
                let num = "";
                while (src.length > 0 && isint(src[0])) {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number));
            } else if (isalpha(src[0])) {
                let ident = ""; // foo let
                while (src.length > 0 && isalpha(src[0])) {
                    ident += src.shift();
                }

                // check for reserved keyword
                const reserved = KEYWORDS[ident];
                if (reserved == undefined) {
                tokens.push(token(ident, TokenType.Identifier));
                } else {
                    tokens.push(token(ident, reserved));
                }
            } else if (isskippable(src[0])) {
                src.shift(); // SKIP THE CURRENT CHARACTER
            } else {
                console.log("Unreconized character found in source: ", src[0]);
                Deno.exit(1);
            }
        }
    }

    return tokens;
}

const source = await Deno.readTextFile("./test.txt");
for (const token of tokenize(source)) {
    console.log(token);
}