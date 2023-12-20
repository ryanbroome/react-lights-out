import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

it("renders App without crashing", () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  root.render(<App />);
});
