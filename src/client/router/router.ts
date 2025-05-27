// Import necessary Views for the SPA
import { Welcome } from "@/views/Welcome";
import { Signin } from "@/views/Signin";
import { Signup } from "@/views/Signup";
import { Home } from "@/views/Home";
import { Game } from "@/views/Game";
import { Dashboard } from "@/views/Dashboard";
import { Friends } from "@/views/Friends";
import { Chat } from "@/views/Chat";
import { Profile } from "@/views/Profile";
import { Settings } from "@/views/Settings";
import { Logout } from "@/views/Logout";
import { getUserProfile } from "@/services/handle-user-auth";

// Define the routes and their corresponding components
const routes: Record<string, () => HTMLElement> = {
  welcome: Welcome,
  signin: Signin,
  signup: Signup,
  salon: Home,
  arena: Game,
  honor: Dashboard,
  lounge: Chat,
  members: Friends,
  profile: Profile,
  mechanics: Settings,
  exit: Logout,
};

// Store the user globally
let currentUser: any = null;

// Define public routes that do not require authentication
const publicRoutes = ["signin", "signup", "welcome"];

// Function to check if the user is authenticated
function isAuthenticated(): boolean {
  return !!localStorage.getItem("auth");
}

// Main router function to handle navigation and rendering
export async function router(): Promise<void> {
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

  if (isAuthenticated() && isPublic) {
    history.replaceState(null, "", "/salon");
    router();
    return;
  }

  if (!isPublic && isAuthenticated()) {
    currentUser = await getUserProfile();
    if (!currentUser) {
      localStorage.removeItem("accessToken");
      history.replaceState(null, "", "/signin");
      await router();
      return;
    }
  }

  // Clear existing DOM and render the component
  while (app.firstChild) app.removeChild(app.firstChild);
  app.appendChild(render());

  const allLinks = document.querySelectorAll(".nav-item");
  allLinks.forEach((li) => li.classList.remove("active"));

  const activeLink = document.querySelector(`.nav-item-link[href="/${path}"]`);
  if (activeLink?.parentElement) {
    activeLink.parentElement.classList.add("active");
  }
}

export function setupSPA(): void {
  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest("[data-link]") as HTMLAnchorElement | null;

    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href) {
        history.pushState(null, "", href);
        await router();
      }
    }
  });
}
