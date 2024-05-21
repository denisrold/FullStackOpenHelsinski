import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    //Con globals: true, no es necesario importar palabras clave como describe, test y expect en las pruebas.
    globals: true,
    setupFiles: "./testSetup.js",
  },
});
