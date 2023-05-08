import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // To access env vars here use process.env.TEST_VAR
  server: {
    proxy: {
      "/api": "http://localhost:8900",
    },
  },
  plugins: [react()],
});
