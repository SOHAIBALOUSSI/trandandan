import "./styles/all.min.css";
import "./styles/normalize.css";
import "./styles/main.css";

import { setupSPA } from "./router/router";
import { Welcome } from "./views/Welcome";
import { Signin } from "./views/Signin";
import { Signup } from "./views/Signup";
import { Home } from "./views/Home";
import { Game } from "./views/Game";
import { Dashboard } from "./views/Dashboard";
import { Friends } from "./views/Friends";
import { Chat } from "./views/Chat";
import { Profile } from "./views/Profile";
import { Settings } from "./views/Settings";
import { Logout } from "./views/Logout";

const routes: Record<string, () => HTMLElement> = {
  signin: Signin,
  signup: Signup,
  logout: Logout,
  home: Home,
  game: Game,
  dashboard: Dashboard,
  friends: Friends,
  chat: Chat,
  profile: Profile,
  settings: Settings,
  welcome: Welcome,
};

const publicRoutes = ["signin", "signup", "welcome"];

function isAuthenticated(): boolean {
  return !!localStorage.getItem("auth");
}

// Main routing logic
function router(): void {
  const app = document.getElementById("app");
  if (!app) return;

  const path = location.pathname.slice(1) || "welcome";
  const isPublic = publicRoutes.includes(path);
  const render = routes[path] || routes["welcome"];

  if (!isPublic && !isAuthenticated()) {
    history.replaceState(null, "", "/signin");
    router();
    return;
  }

  if (isAuthenticated() && publicRoutes.includes(path)) {
    history.replaceState(null, "", "/home");
    router();
    return;
  }

  while (app.firstChild) app.removeChild(app.firstChild);
  app.appendChild(render());

  const allLinks = document.querySelectorAll(".nav-item");
  allLinks.forEach((li) => li.classList.remove("active"));

  const activeLink = document.querySelector(`.nav-item-link[href="/${path}"]`);
  if (activeLink?.parentElement) {
    activeLink.parentElement.classList.add("active");
  }
}

// Setup SPA behavior
setupSPA(router);

// Handle page load and history changes
window.addEventListener("load", router);
window.addEventListener("popstate", router);
