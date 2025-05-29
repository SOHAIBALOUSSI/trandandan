// Main entry point for the client-side application

// Import necessary styles and router setup
import "./styles/all.min.css";
import "./styles/normalize.css";
import "./styles/main.css";
import { router } from "./router/router";

// Setup Single Page Application link interception
export function setupSPA(): void {
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest("[data-link]") as HTMLAnchorElement | null;

    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href && href !== window.location.pathname) {
        history.pushState(null, "", href);
        await router(); // Re-render the application with the new route
      }
    }
  });
}

// Main SPA router logic
setupSPA();
window.addEventListener("load", router);
window.addEventListener("popstate", router);
