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
import { ResetPassword } from "@/views/ResetPassword";
import { UpdatePassword } from "@/views/UpdatePassword";
import { VerifyLogin } from "@/views/VerifyLogin";
// Import necessary services
import { getUserProfile } from "@/services/handle-user-auth";

// Define the routes and their corresponding components
const routes: Record<string, () => HTMLElement> = {
  welcome: Welcome,
  signin: Signin,
  signup: Signup,
  salon: Home,
  arena: Game,
  chamber: Dashboard,
  lounge: Chat,
  members: Friends,
  profile: Profile,
  mechanics: Settings,
  exit: Logout,
  password_reset: ResetPassword,
  password_update: UpdatePassword,
  verify_login: VerifyLogin,
};

// Public pages that don't require authentication
const publicRoutes = [
  "signin",
  "signup",
  "welcome",
  "password_reset",
  "password_update",
  "verify_login",
];

// Global user object
let currentUser: Promise<any> | null = null;

// Check if a user is authenticated
function isAuthenticated(): boolean {
  return !!localStorage.getItem("accessToken");
}

// Check if the user is in the process of resetting their password
function isUserForgotPassword(): boolean {
  return !!localStorage.getItem("tempTokenPassword");
}

// Router function to handle navigation and rendering
export async function router(): Promise<void> {
  const app = document.getElementById("app");
  if (!app) return;

  const path = location.pathname.slice(1) || "welcome";
  const isPublic = publicRoutes.includes(path);
  const render = routes[path];

  // Restrict access to password_update unless tempTokenPassword is set
  if (path === "password_update" && !isUserForgotPassword()) {
    history.replaceState(null, "", "/signin");
    await router();
    return;
  }

  if (!isPublic && !isAuthenticated()) {
    history.replaceState(null, "", "/signin");
    await router();
    return;
  }

  if (isAuthenticated() && isPublic) {
    history.replaceState(null, "", "/salon");
    await router();
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

    console.log("Current User:", currentUser);
  }

  // Clear the existing app content
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }

  // Render the current route's component
  app.appendChild(render());

  // Activate nav link
  document
    .querySelectorAll(".nav-item")
    .forEach((li) => li.classList.remove("active"));
  const activeLink = document.querySelector(`.nav-item-link[href="/${path}"]`);
  if (activeLink?.parentElement) {
    activeLink.parentElement.classList.add("active");
  }
}
