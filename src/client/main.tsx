// Importing necessary styles
import "./styles/all.min.css";
import "./styles/normalize.css";
import "./styles/main.css";

// Importing views for the application
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

const routes: Record<string, () => HTMLElement> = {
  signin: Signin,
  signup: Signup,
  home: Home,
  game: Game,
  dashboard: Dashboard,
  friends: Friends,
  chat: Chat,
  profile: Profile,
  settings: Settings,
  welcome: Welcome,
};

function router(): void {
  const app = document.getElementById("app");
  if (!app) return;

  const route = location.hash.slice(1) || "welcome";
  const render = routes[route] || Welcome;

  app.innerHTML = "";
  app.appendChild(render());
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);

// Selecting the root element for the application
const app = document.getElementById("app");
