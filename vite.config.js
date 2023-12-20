import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/", import.meta.url)),
      "@helperComps": fileURLToPath(
        new URL("./src/components/__helperComponents__/", import.meta.url)
      ),
      "@utilComps": fileURLToPath(
        new URL("./src/components/__utilComponents__/", import.meta.url)
      ),
    },
  },
});
