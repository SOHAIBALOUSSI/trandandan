import { Welcome } from "@/views/Welcome";
import { Signin } from "@/views/Signin";
import { Signup } from "@/views/Signup";
import { ResetPassword } from "@/views/LostPassword";
import { UpdatePassword } from "@/views/UpdatePassword";
import { VerifyLogin } from "@/views/VerifyLogin";
import { Home } from "@/views/Home";
import { Game } from "@/views/Game";
import { Dashboard } from "@/views/Dashboard";
import { Friends } from "@/views/Friends";
import { Chat } from "@/views/Chat";
import { Profile } from "@/views/Profile";
import { Settings } from "@/views/Settings";
import { Blocked } from "@/views/Blocked";
import { DeleteAccount } from "@/views/DeleteAccount";
import { Logout } from "@/views/Logout";
import { getUserProfile } from "@/services/get-user-profile";
import { setCurrentUser } from "@/utils/user-store";

// Define the routes and their corresponding components
const routes: Record<string, () => HTMLElement> = {
  welcome: Welcome,
  signin: Signin,
  signup: Signup,
  password_reset: ResetPassword,
  password_update: UpdatePassword,
  verify_login: VerifyLogin,
  salon: Home,
  arena: Game,
  chamber: Dashboard,
  lounge: Chat,
  members: Friends,
  my_profile: Profile,
  mechanics: Settings,
  blocked: Blocked,
  delete_account: DeleteAccount,
  exit: Logout,
};

// Public pages that don't require authentication
const publicRoutes: string[] = [
  "welcome",
  "signin",
  "signup",
  "password_reset",
  "password_update",
  "verify_login",
];

// Check if a user is authenticated
async function isAuthenticated(): Promise<boolean> {
  const profile = await getUserProfile();
  if (profile) {
    setCurrentUser(profile);
    return true;
  }
  return false;
}

// Router function to handle navigation and rendering
export async function router(): Promise<void> {
  const app = document.getElementById("app");
  if (!app) return;

  const path = location.pathname.slice(1) || "welcome";
  const isPublic = publicRoutes.includes(path);
  const render = routes[path];

  const authed = await isAuthenticated();

  if (!isPublic && !authed) {
    history.replaceState(null, "", "/signin");
    await router();
    return;
  }

  if (isPublic && authed) {
    history.replaceState(null, "", "/salon");
    await router();
    return;
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
