import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import App from "./app.tsx";

import "./assets/tailwind.scss";
import "./assets/global.scss";
import "@xyflow/react/dist/style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </StrictMode>
);
