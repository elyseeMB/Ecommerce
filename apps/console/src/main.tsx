import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StoreProvider } from "./store.tsx";
import { IconSymbols } from "@ui/website";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <IconSymbols />
      <App />
    </StoreProvider>
  </StrictMode>,
);
