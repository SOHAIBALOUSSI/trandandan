import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src/client", import.meta.url).pathname,
    },
  },

  esbuild: {
    jsx: "transform",
    jsxDev: false,
    jsxImportSource: "@",
    jsxInject: `import { jsx } from '@/jsx-runtime'`,
    jsxFactory: "jsx.component",
  },

  server: {
    proxy: {
      '/auth': 'http://auth:3000',
    },
  },
});


/*
Here we have told esbuild that we want it 
to transform any JSX code it finds in our source. 
When building the code, it will inject the jsxInject 
to the top of the file and use jsx.component 
when transforming regular components.
*/
