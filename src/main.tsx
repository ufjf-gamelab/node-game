import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import { MantineProvider } from "@mantine/core";
import { LayoutProvider } from "@/contexts/layout-context.tsx";
import { mantineTheme } from "@/config/mantine-theme.ts";
import App from "./App.tsx";

import "./assets/tailwind.scss";
import "./assets/global.scss";
import "@xyflow/react/dist/style.css";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  <ReactFlowProvider>
    <LayoutProvider>
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <App />
      </MantineProvider>
    </LayoutProvider>
  </ReactFlowProvider>
);
