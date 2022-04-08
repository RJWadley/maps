import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // copy files
    viteStaticCopy({
      targets: [
        {
          src: "serviceworker.js",
          dest: ".",
        },
      ],
    }),
  ],
  assetsInclude: ["serviceworker.js"],
});
