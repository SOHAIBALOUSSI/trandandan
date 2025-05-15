import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/client/"),
    },
  },
  esbuild: {
    jsx: "transform",
    jsxDev: false,
    jsxImportSource: "@",
    jsxInject: `import { jsx } from '@/jsx-runtime'`,
    jsxFactory: "jsx.component",
  },
});
