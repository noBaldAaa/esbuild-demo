import { createRoot } from "react-dom/client";
import React from "react";

import PageA from "./src/pages/PageA.js";
import PageB from "./src/pages/PageB";
import PageC from "./src/pages/PageC";

import data1 from "./src/mock/1.json";
import data2 from "./src/mock/2.txt";

import WEBPACK_LOGO_IMG from "./src/imgs/webpack-logo.jpg";

import "./main.css";

const App = () => {
  console.log(data1, "data1");
  console.log(data2, "data2");
  return (
    <div>
      <p>main.js入口文件：</p>
      <img src={WEBPACK_LOGO_IMG} />
      <p className="main-test-css-background">hello esbuild - 测试css文件</p>
      <PageA />
      <div style={{ height: "1px", background: "#666" }}></div>
      <PageB />
      <div style={{ height: "1px", background: "#666" }}></div>
      <PageC />
      <div style={{ height: "1px", background: "#666" }}></div>
      <div style={{ margin: "10px" }}>
        测试图标： <span className="iconfont icon-delet"></span>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
