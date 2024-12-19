import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css"; 
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faTwitter, faInstagram);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

