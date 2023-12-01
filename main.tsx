import { createRoot } from "react-dom/client";
import React from "react";

import PageA from "./src/pages/PageA.js";
import PageB from "./src/pages/PageB";

import "./main.css";

const App = () => {
  return (
    <div>
      <p className="main-test-css-color">hello esbuild - 测试css文件</p>
      <PageA />
      <br></br>
      <PageB />
    </div>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
