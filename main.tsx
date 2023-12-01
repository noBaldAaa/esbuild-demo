import { createRoot } from "react-dom/client";
import React from "react";

import PageA from "./src/pages/PageA.js";

const App = () => {
  return (
    <div>
      <p>hello esbuild</p>
      <PageA />
    </div>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
