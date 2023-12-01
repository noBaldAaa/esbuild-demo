import { createRoot } from "react-dom/client";
import React from "react";

const App = () => {
  return (
    <div>
      <span className="iconfont icon-delet"></span>
      <PageA />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
