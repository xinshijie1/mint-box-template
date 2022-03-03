"use strict";
exports.__esModule = true;
exports.parseTokenMap = void 0;
var token_tree_1 = require("./token-tree");
function parseTokenMap(tokens) {
    // construct a tree
    var tree = new token_tree_1["default"](tokens);
    var newTokens = tokens.map(function (token, index) {
        return {
            uri: token.uri,
            creator: token.creator,
            proofs: tree.getProof(token)
        };
    });
    return {
        merkleRoot: tree.getHexRoot(),
        total: tokens.length,
        tokens: newTokens
    };
}
exports.parseTokenMap = parseTokenMap;
