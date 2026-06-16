import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const src = (p) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-crud-icons": src("components/widgets/Icon/Icon.jsx"),
      "config.js": src("config.js"),
      config: src("config.js"),
      utils: src("utils"),
      components: src("components"),
      pages: src("pages"),
      routes: src("routes"),
      i18n: src("i18n"),
      models: src("models"),
      dao: src("dao"),
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
    setupFiles: "./src/setupTests.js",
    coverage: {
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/models/**"],
      reporter: ["text", "html"],
    },
  },
});
