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

// Selecting the root element for the application
const app = document.getElementById("app");

// Rendering views manually for testing
app?.append(<Home />);

// function router(): void {
//   const app: any = document.querySelector(".app");
//   if (!app) return;

//   const route = location.hash.slice(1);
//   app.innerHTML = "";

//   switch (route) {
//     case "signin":
//       renderSignIn(app);
//       break;
//     case "signup":
//       renderSignUp(app);
//       break;
//     case "home":
//       renderHome(app);
//       break;
//     case "settings":
//       renderSettings(app);
//       break;
//     case "profile":
//       renderProfile(app);
//       break;
//     case "friends":
//       renderFriends(app);
//       break;
//     case "chat":
//       renderChat(app);
//       break;
//     case "game":
//       renderGame(app);
//       break;
//     case "dashboard":
//       renderDashboard(app);
//       break;
//     default:
//       renderWelcome(app);
//   }
// }

// window.addEventListener("hashchange", router);
// window.addEventListener("load", router);
