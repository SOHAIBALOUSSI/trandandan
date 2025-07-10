import { Welcome } from "@/views/Welcome";
import { Signin } from "@/views/Signin";
import { Signup } from "@/views/Signup";
import { ResetPassword } from "@/views/LostPassword";
import { UpdatePassword } from "@/views/ResetPassword";
import { VerifyLogin } from "@/views/VerifyLogin";
import { Home } from "@/views/Home";
import { Game } from "@/views/Game";
import { Dashboard } from "@/views/Dashboard";
import { Friends } from "@/views/Friends";
import { Chat } from "@/views/Chat";
import { Profile } from "@/views/Profile";
import { Security } from "@/views/Security";
import { Blocked } from "@/views/Blocked";
import { DeleteAccount } from "@/views/DeleteAccount";
import { Logout } from "@/views/Logout";
import { UpdateCredentialsPassword } from "@/views/UpdateCredentialsPassword";
import { UpdateCredentialsEmail } from "@/views/UpdateCredentialsEmail";
import { VerifyUpdateCredentials } from "@/views/VerifyUpdateCredentials";
import { Notifications } from "@/views/Notifications";
import { LocalGame } from "@/components/game/LocalGame";
import { RemoteGame } from "@/components/game/RemoteGame";
import { Tournaments } from "@/components/game/Tournaments";
import { getUserProfile } from "@/services/get-user-profile";
import { setCurrentUser } from "@/utils/user-store";
import { startNotificationListener } from "@/handlers/notifications";

// Routes and their corresponding components
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
  profile: Profile,
  exit: Logout,
  duel: LocalGame,
  remote: RemoteGame,
  tournament: Tournaments,
  my_chamber: Profile,
  security: Security,
  change_password: UpdateCredentialsPassword,
  change_email: UpdateCredentialsEmail,
  verification: VerifyUpdateCredentials,
  blocked: Blocked,
  wipe_account: DeleteAccount,
  notifs: Notifications,
  checkout: Logout,
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
  const app = document.getElementById("app") as HTMLDivElement;
  if (!app) return;

  const path = location.pathname.slice(1) || "welcome";
  const isPublic = publicRoutes.includes(path);
  const render = routes[path];

  let authed = false;

  if (!isPublic) {
    authed = await isAuthenticated();
    if (!authed) {
      history.replaceState(null, "", "/signin");
      await router();
      return;
    }
  }

  // Handle unknown routes
  if (!render) {
    isPublic
      ? history.replaceState(null, "", "/welcome")
      : history.replaceState(null, "", "/salon");
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
