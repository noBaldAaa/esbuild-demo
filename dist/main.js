"use strict";
(() => {
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

  // react-dom:react-dom/client
  var require_client = __commonJS({
    "react-dom:react-dom/client"(exports, module) {
      module.exports = window.ReactDOM;
    }
  });

  // react:react
  var require_react = __commonJS({
    "react:react"(exports, module) {
      module.exports = window.React;
    }
  });

  // main.tsx
  var import_client = __toESM(require_client());
  var import_react4 = __toESM(require_react());

  // src/pages/PageA.js
  var import_react = __toESM(require_react());

  // src/pages/pageA.module.css
  var pageA_default = {
    "pageA-test-module-background": "pageA_pageA-test-module-background",
    "pageA-background-image": "pageA_pageA-background-image"
  };

  // src/pages/PageA.js
  var PageA = () => {
    return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: pageA_default["pageA-test-module-background"] }, "\u6211\u662FPageA\u9875\u9762 \u6D4B\u8BD5.module.css\u6587\u4EF6"), /* @__PURE__ */ import_react.default.createElement("div", null, " \u6D4B\u8BD5\u901A\u8FC7background-image\u5F15\u5165\u56FE\u7247:"), /* @__PURE__ */ import_react.default.createElement("div", { className: pageA_default["pageA-background-image"] }));
  };
  var PageA_default = PageA;

  // src/pages/PageB.tsx
  var import_react2 = __toESM(require_react());

  // src/imgs/esbuild.svg
  var esbuild_default = 'data:image/svg+xml,<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">%0A  <circle cx="100" cy="100" r="100" fill="%23FFCF00"/>%0A  <path d="M47.5 52.5L95 100l-47.5 47.5m60-95L155 100l-47.5 47.5" fill="none" stroke="%23191919" stroke-width="24"/>%0A</svg>%0A';

  // src/pages/PageB.tsx
  var PageB = () => {
    (0, import_react2.useEffect)(() => {
      const dom = document.getElementById("img");
      dom.src = esbuild_default;
    }, []);
    return /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "pageB-test-less-background" }, "\u6211\u662FPageB\u9875\u9762 \u6D4B\u8BD5.less\u6587\u4EF6"), /* @__PURE__ */ import_react2.default.createElement("div", null, "\u6D4B\u8BD5\u5728tsx\u4E2D\u901A\u8FC7import\u7684\u65B9\u5F0F\u5BFC\u5165\u56FE\u7247\uFF1A"), /* @__PURE__ */ import_react2.default.createElement(
      "img",
      {
        src: esbuild_default,
        style: { width: "100px", height: "100px", backgroundSize: "contain" }
      }
    ), /* @__PURE__ */ import_react2.default.createElement("div", null, "\u6D4B\u8BD5\u5728tsx\u4E2D\u901A\u8FC7dom\u7684\u65B9\u5F0F\u63D2\u5165\u56FE\u7247\uFF1A"), /* @__PURE__ */ import_react2.default.createElement(
      "img",
      {
        id: "img",
        style: { width: "100px", height: "100px", backgroundSize: "contain" }
      }
    ));
  };
  var PageB_default = PageB;

  // src/pages/PageC.tsx
  var import_react3 = __toESM(require_react());

  // src/pages/pageC.module.less
  var pageC_module_default = {
    "pageC-test-module-less-background": "pageC_module_pageC-test-module-less-background"
  };

  // src/pages/PageC.tsx
  var PageC = () => {
    return /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h3", { className: pageC_module_default["pageC-test-module-less-background"] }, "\u6211\u662FPageC\u9875\u9762 \u6D4B\u8BD5.module.less\u6587\u4EF6"));
  };
  var PageC_default = PageC;

  // src/mock/1.json
  var __default = {
    name: "\u4E0D\u8981\u79C3\u5934\u554A"
  };

  // src/mock/2.txt
  var __default2 = '"hello \uFF0C\u6211\u662F data \u683C\u5F0F"\n\n';

  // src/imgs/webpack-logo.jpg
  var webpack_logo_default = "./webpack-logo-OT5JZUSR.jpg";

  // main.tsx
  var App = () => {
    console.log(__default, "data1");
    console.log(__default2, "data2");
    return /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("p", null, "main.js\u5165\u53E3\u6587\u4EF6\uFF1A"), /* @__PURE__ */ import_react4.default.createElement("img", { src: webpack_logo_default }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "main-test-css-background" }, "hello esbuild - \u6D4B\u8BD5css\u6587\u4EF6"), /* @__PURE__ */ import_react4.default.createElement(PageA_default, null), /* @__PURE__ */ import_react4.default.createElement("div", { style: { height: "1px", background: "#666" } }), /* @__PURE__ */ import_react4.default.createElement(PageB_default, null), /* @__PURE__ */ import_react4.default.createElement("div", { style: { height: "1px", background: "#666" } }), /* @__PURE__ */ import_react4.default.createElement(PageC_default, null), /* @__PURE__ */ import_react4.default.createElement("div", { style: { height: "1px", background: "#666" } }), /* @__PURE__ */ import_react4.default.createElement("div", { style: { margin: "10px" } }, "\u6D4B\u8BD5\u56FE\u6807\uFF1A ", /* @__PURE__ */ import_react4.default.createElement("span", { className: "iconfont icon-delet" })));
  };
  var root = (0, import_client.createRoot)(document.getElementById("root"));
  root.render(/* @__PURE__ */ import_react4.default.createElement(App, null));
})();
//# sourceMappingURL=main.js.map
