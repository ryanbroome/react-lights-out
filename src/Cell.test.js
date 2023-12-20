import React from "react";
import ReactDOM from "react-dom/client";
import Cell from "./Cell";

it("renders Cell without crashing", () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  root.render(<Cell />);
});
