import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/public/index.css"; // Public styles
import "./styles/cms/index.css"; // CMS styles
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
