import { createRoot } from "react-dom/client";
import React from "react";

import PageA from "./src/pages/PageA.js";
import PageB from "./src/pages/PageB";
import PageC from "./src/pages/PageC";

import "./main.css";

const App = () => {
  return (
    <div>
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
