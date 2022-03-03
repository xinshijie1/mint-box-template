"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null"
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
exports.UPDATE_CHAINID =
  exports.UPDATE_ACCOUNT =
  exports.UPDATE_CONTRACTADDR =
    void 0;
var vuex_1 = require("vuex");
var vue_1 = require("vue");
vue_1["default"].use(vuex_1["default"]);
exports.UPDATE_ACCOUNT = "update-account";
exports.UPDATE_CHAINID = "update-chainId";
exports.UPDATE_CONTRACTADDR = "update-contractAddr";
var InvoiceStore = /** @class */ (function (_super) {
  __extends(InvoiceStore, _super);
  function InvoiceStore() {
    var _a;
    return (
      _super.call(this, {
        state: {
          account: "",
          chainId: "",
          contractAddr: "",
        },
        mutations:
          ((_a = {}),
          (_a[exports.UPDATE_ACCOUNT] = function (state, account) {
            state.account = account;
          }),
          (_a[exports.UPDATE_CHAINID] = function (state, chainId) {
            state.chainId = chainId;
          }),
          (_a[exports.UPDATE_CONTRACTADDR] = function (state, contractAddr) {
            state.contractAddr = contractAddr;
          }),
          _a),
      }) || this
    );
  }
  InvoiceStore.prototype.init = function (state) {
    this.commit(exports.UPDATE_ACCOUNT, state.account);
    this.commit(exports.UPDATE_CHAINID, state.chainId);
    this.commit(exports.UPDATE_CONTRACTADDR, state.contractAddr);
  };
  return InvoiceStore;
})(vuex_1["default"].Store);
var store = new InvoiceStore();
exports["default"] = store;
