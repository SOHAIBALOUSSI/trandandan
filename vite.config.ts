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

/*
Here we have told esbuild that we want it 
to transform any JSX code it finds in our source. 
When building the code, it will inject the jsxInject 
to the top of the file and use jsx.component 
when transforming regular components.
*/
