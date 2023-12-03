var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// react:react
var require_react = __commonJS({
  "react:react"(exports, module) {
    module.exports = window.React;
  }
});

// src/pages/PageA.js
var import_react = __toESM(require_react());

// src/pages/pageA.module.css
var pageA_default = {};

// src/pages/PageA.js
var PageA = () => {
  return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: pageA_default["pageA-test-module-background"] }, "\u6211\u662FPageA\u9875\u9762 \u6D4B\u8BD5.module.css\u6587\u4EF6"), /* @__PURE__ */ import_react.default.createElement("div", null, " \u6D4B\u8BD5\u901A\u8FC7background-image\u5F15\u5165\u56FE\u7247:"), /* @__PURE__ */ import_react.default.createElement("div", { className: pageA_default["pageA-background-image"] }));
};
var PageA_default = PageA;

export {
  __commonJS,
  __toESM,
  require_react,
  PageA_default
};
