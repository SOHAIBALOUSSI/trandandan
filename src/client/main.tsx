// Main entry point for the client-side application

// Import necessary styles and components
import "./styles/all.min.css";
import "./styles/normalize.css";
import "./styles/main.css";
import { setupSPA } from "./router/router";
import { router } from "./router/router";

// Setup SPA behavior
setupSPA(router);

// Handle page load and history changes
window.addEventListener("load", router);
window.addEventListener("popstate", router);
