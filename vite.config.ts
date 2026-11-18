/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const src = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-crud-icons": src("components/ui/Icon/Icon.tsx"),
      "config.js": src("config.ts"),
      config: src("config.ts"),
      utils: src("utils"),
      components: src("components"),
      pages: src("pages"),
      routes: src("routes"),
      i18n: src("i18n"),
      dao: src("dao"),
      types: src("types"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["import"],
        loadPaths: ["src"],
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    // - "codemirror-json-schema" has imports w/o file extensions (Node can't
    //   load them): let Vite process it
    server: { deps: { inline: ["codemirror-json-schema"] } },
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/fixtures/**"],
      reporter: ["text", "html"],
    },
  },
});
