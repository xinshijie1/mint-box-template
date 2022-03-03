/// <reference types="node" />
export interface Token {
    creator: string;
    uri: string;
}
export default class TokenTree {
    private readonly tree;
    constructor(tokens: Token[]);
    static verifyProof(token: Token, proof: Buffer[], root: Buffer): boolean;
    static toNode(token: Token): Buffer;
    getHexRoot(): string;
    getProof(token: Token): string[];
}
