// Internal Imports
import React from "react";
import { createRoot } from "react-dom/client";

// Components
import App from "./App";

// External Imports
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter } from "react-router-dom";

// Contexts
import StateContextProvider from "./contexts";

// Styles
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      authConfig={{
        // Set this to your domain to prevent phishing attacks
        // domain: "",
        // The URL of your Auth API
        authUrl: "/logout",
      }}
    >
      <StateContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
