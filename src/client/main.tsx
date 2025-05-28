// Main entry point for the client-side application

// Import necessary styles and router setup
import "./styles/all.min.css";
import "./styles/normalize.css";
import "./styles/main.css";
import { setupSPA } from "./router/router";
import { router } from "./router/router";

// Initialize the SPA and set up event listeners for routing
setupSPA();
window.addEventListener("load", router);
window.addEventListener("popstate", router);
