"use strict";
exports.__esModule = true;
exports.isNetworkSupported =
  exports.formatNetwork =
  exports.defaultDeadline =
  exports.formatToken =
  exports.toToken =
  exports.uint256Max =
  exports.oneToken =
  exports.WETH =
    void 0;
var ethers_1 = require("ethers");
exports.WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
exports.oneToken = ethers_1.BigNumber.from((1e18).toString());
exports.uint256Max = ethers_1.BigNumber.from("1").shl(256).sub(1);
var toToken = function (value) {
  var n = ethers_1.BigNumber.from(value);
  if (n.lte(ethers_1.BigNumber.from("1"))) {
    return ethers_1.BigNumber.from((parseFloat(value) * 1e18).toString());
  }
  return n.mul(exports.oneToken);
};
exports.toToken = toToken;
var formatToken = function (value, fixed) {
  if (fixed === void 0) {
    fixed = 6;
  }
  var max = ethers_1.BigNumber.from(Number.MIN_SAFE_INTEGER.toString());
  if (value.gt(max)) {
    return value.div(exports.oneToken).toString();
  }
  var i = ethers_1.BigNumber.from(Math.pow(10, 18 - fixed));
  return (value.div(i).toNumber() / Math.pow(10, fixed)).toFixed(fixed);
};
exports.formatToken = formatToken;
var defaultDeadline = function () {
  return ethers_1.BigNumber.from(Math.floor(Date.now() / 1000 + 100000));
};
exports.defaultDeadline = defaultDeadline;
var formatNetwork = function (chainId) {
  switch (chainId) {
    case 0x1:
      return "Mainnet";
    case 0x3:
      return "Ropsten";
    case 0x4:
      return "Rinkeby";
    case 0x5:
      return "Goerli";
    case 0x2a:
      return "Kovan";
    case 0x13881:
      return "Mumbai";
    case 0x61:
      return "BSC-test";
    default:
      return "Unknown";
  }
};
exports.formatNetwork = formatNetwork;
var isNetworkSupported = function (chainId) {
  return chainId == 0x4;
};
exports.isNetworkSupported = isNetworkSupported;

Date.prototype.format = function (format) {
  if (format == "date") {
    return this.toDateString().replace(/^\w+\s/, "");
  }
  if (!format) {
    return this.toString()
      .replace(/^\w+\s/, "")
      .replace(/\sGMT.*$/, "");
  }
  var o = {
    "y+": this.getFullYear(),
    "M+": this.getMonth() + 1,
    "d+": this.getDate(), //day
    "x+": ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][this.getDay()],
    "H+": this.getHours(),
    h: (this.getHours() > 12 ? "PM" : "AM") + (this.getHours() % 12),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    S: this.getMilliseconds(),
  };
  for (var k in o) {
    var reg = new RegExp("(" + k + ")");
    if (reg.test(format)) {
      var v = o[k] + "";
      if (v.length == 1 && RegExp.$1.length < 4 && RegExp.$1.length > 1)
        v = "0" + v;
      format = format.replace(reg, v);
    }
  }
  return format;
};
