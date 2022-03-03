"use strict";
exports.__esModule = true;
var merkle_tree_1 = require("./merkle-tree");
var ethers_1 = require("ethers");
var TokenTree = /** @class */ (function () {
    function TokenTree(tokens) {
        this.tree = new merkle_tree_1["default"](tokens.map(function (token) {
            return TokenTree.toNode(token);
        }));
    }
    TokenTree.verifyProof = function (token, proof, root) {
        var pair = TokenTree.toNode(token);
        for (var _i = 0, proof_1 = proof; _i < proof_1.length; _i++) {
            var item = proof_1[_i];
            pair = merkle_tree_1["default"].combinedHash(pair, item);
        }
        return pair.equals(root);
    };
    TokenTree.toNode = function (token) {
        return Buffer.from(ethers_1.utils.solidityKeccak256(['address', 'string'], [token.creator, token.uri]).substring(2), 'hex');
    };
    TokenTree.prototype.getHexRoot = function () {
        return this.tree.getHexRoot();
    };
    // returns the hex bytes32 values of the proof
    TokenTree.prototype.getProof = function (token) {
        return this.tree.getHexProof(TokenTree.toNode(token));
    };
    return TokenTree;
}());
exports["default"] = TokenTree;
