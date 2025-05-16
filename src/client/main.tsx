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

// function Welcome() {
//   return (
//     <div className="p-10 text-center light-page">
//       <h1 className="main-heading-dark">Hello World</h1>
//       <p className="text-lg text-gray-600">Fully working with Docker + Vite</p>
//     </div>
//   );
// }

function Welcome() {
  return (
    <section className="light-page">
      <div className="container wlcm-page">
        <div className="signin-action">
          <button className="btn-primary">
            <i class="fa-solid fa-ticket"></i>
            Enter The Club
          </button>
          <p>“Take your first step into the court”</p>
        </div>
        <div className="main-title">
          <h1 className="custom-one">Welcome to the bhv ping pong club</h1>
          <h3>Play like it’s 1901. Compete like a champion.</h3>
        </div>
        <footer>
          Est. in Spirit — Reviving the Golden Age of the Game. © 2025 BHV Club
        </footer>
      </div>
    </section>
  );
}

document.getElementById("app")?.appendChild(<Welcome />);

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
