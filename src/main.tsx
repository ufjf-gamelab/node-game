import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import { MantineProvider } from "@mantine/core";
import { LayoutProvider } from "./contexts/layout-context.tsx";
import { mantineTheme } from "./config/mantine-theme.ts";
import { SimulationProvider } from "@/contexts/simulation-context.tsx";
import App from "./App.tsx";

import "./assets/tailwind.scss";
import "./assets/global.scss";
import "@xyflow/react/dist/style.css";
import "@mantine/core/styles.css";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <LayoutProvider>
        <SimulationProvider>
          <MantineProvider theme={mantineTheme} defaultColorScheme="light">
            <App />
          </MantineProvider>
        </SimulationProvider>
      </LayoutProvider>
    </ReactFlowProvider>
  </StrictMode>
);
