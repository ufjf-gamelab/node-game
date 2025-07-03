import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/node-crafter/",
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  assetsInclude: ["**/*.md"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
