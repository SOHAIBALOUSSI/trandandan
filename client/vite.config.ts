import { defineConfig } from "vite";
import fs from 'fs';
import path from 'path';
import { fileURLToPath, URL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
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
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl/dev-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl/dev-cert.pem')),
    },
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      "/auth": "http://auth:3000",
      "/2fa": "http://auth:3000",
      "/profile": "http://profile:3001",
      "/friends": "http://friends:3002",
      "/block": "http://friends:3002",
      "/game": {
        target: "http://game:5000",
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
        rewrite: (path) => path.replace(/^\/game/, ''),
      },
      "/notifications": {
        target: "http://notifications:3003",
        changeOrigin: true,
        ws: true,
      },
      "/chat": {
        target: "http://chat:3004",
        changeOrigin: true,
        ws: true,
      },
      "/dashboard": {
        target: "http://dashboard:3005",
        changeOrigin: true,
        ws: true,
      },
    },
    historyApiFallback: true,
  },
});

/*
	Here we have told esbuild that we want it 
	to transform any JSX code it finds in our source. 
	When building the code, it will inject the jsxInject 
	to the top of the file and use jsx.component 
	when transforming regular components.
*/
