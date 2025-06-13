import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StoreProvider } from "./store.tsx";

const data = {
  name: "john Doe",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider data={data}>
      <App />
    </StoreProvider>
  </StrictMode>,
);
