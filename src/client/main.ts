import { renderWelcome } from "./views/Welcome";
import { renderSignIn } from "./views/SignIn";
import { renderSignUp } from "./views/SignUp";
import { renderHome } from "./views/Home";
import { renderGame } from "./views/Game";
import { renderDashboard } from "./views/Dashboard";
import { renderFriends } from "./views/Friends";
import { renderChat } from "./views/Chat";
import { renderProfile } from "./views/Profile";
import { renderSettings } from "./views/Settings";

function router(): void {
  const app: any = document.querySelector(".app");
  if (!app) return;

  const route = location.hash.slice(1);
  app.innerHTML = "";

  switch (route) {
    case "signin":
      renderSignIn(app);
      break;
    case "signup":
      renderSignUp(app);
      break;
    case "home":
      renderHome(app);
      break;
    case "settings":
      renderSettings(app);
      break;
    case "profile":
      renderProfile(app);
      break;
    case "friends":
      renderFriends(app);
      break;
    case "chat":
      renderChat(app);
      break;
    case "game":
      renderGame(app);
      break;
    case "dashboard":
      renderDashboard(app);
      break;
    default:
      renderWelcome(app);
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
