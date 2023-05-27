// Internal Imports
import React from "react";
import { createRoot } from "react-dom/client";

// Components
import App from "./App";

// External Imports
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter } from "react-router-dom";

// Styles
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThirdwebProvider activeChain={Sepolia}>
        <App />
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);
