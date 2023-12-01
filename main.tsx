import { createRoot } from "react-dom/client";
import React from "react";

type Message = {
  a: string;
};

const App = () => {
  return <div>hello esbuild</div>;
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
