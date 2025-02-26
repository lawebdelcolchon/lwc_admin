import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(path.resolve(), "src"),
    },
  },
  server: {
    port: 5173,       // Puerto predeterminado
    strictPort: true // Permite buscar un puerto alternativo si está en uso
  },
});
