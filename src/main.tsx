import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import { LayoutProvider } from "./contexts/layout-context.tsx";
import App from "./App.tsx";

import "./assets/tailwind.scss";
import "./assets/global.scss";
import "@xyflow/react/dist/style.css";

createRoot(document.getElementById("root")!).render(
  <ReactFlowProvider>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </ReactFlowProvider>
);
