import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//@ts-ignore
import "@fontsource-variable/geist-mono";
//@ts-ignore
import "@fontsource-variable/geist";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
