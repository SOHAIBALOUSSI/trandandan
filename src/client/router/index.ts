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
import { Lounge } from "@/views/Lounge";
import { Profile } from "@/views/Profile";
import { MemberProfile } from "@/views/MemberProfile";
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
import { startChatListener } from "@/handlers/chat";
import { startNotificationListener } from "@/handlers/notifications";

// Routes and their corresponding components
const routes: Record<string, (id?: number) => HTMLElement> = {
  welcome: Welcome,
  signin: Signin,
  signup: Signup,
  password_reset: ResetPassword,
  password_update: UpdatePassword,
  verify_login: VerifyLogin,
  salon: Home,
  arena: Game,
  chamber: Dashboard,
  lounge: Lounge,
  members: Friends,
  exit: Logout,
  duel: LocalGame,
  remote: RemoteGame,
  tournament: Tournaments,
  my_profile: Profile,
  security: Security,
  change_password: UpdateCredentialsPassword,
  change_email: UpdateCredentialsEmail,
  verification: VerifyUpdateCredentials,
  muted_players: Blocked,
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
  if (profile) return true;
  return false;
}

let wsStarted = false;

// Router function to handle navigation and rendering
export async function router(): Promise<void> {
  const app = document.getElementById("app") as HTMLDivElement;
  if (!app) return;

  let path = location.pathname.slice(1) || "welcome";
  let chatFriendId: number | undefined;
  let memberId: number | undefined;

  // Detect /chat/:id
  const chatMatch = path.match(/^lounge\/(\d+)$/);
  if (chatMatch) {
    chatFriendId = Number(chatMatch[1]);
    path = "chat-friend";
  }

  // Detect /members/:id
  const profileMatch = path.match(/^members\/(\d+)$/);
  if (profileMatch) {
    memberId = Number(profileMatch[1]);
    path = "member-profile";
  }

  const isPublic = publicRoutes.includes(path);
  const render = routes[path];

  let authed = false;
  if (!isPublic) {
    authed = await isAuthenticated();
    if (authed) {
      if (!wsStarted) {
        // startNotificationListener();
        wsStarted = true;
      }
    }
    if (!authed) {
      history.replaceState(null, "", "/signin");
      await router();
      return;
    }
  }

  // Handle unknown routes
  if (!render && path !== "member-profile" && path !== "chat-friend") {
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
  if (path === "chat-friend" && chatFriendId) {
    const chatView = await Chat(chatFriendId);
    app.appendChild(chatView);
  } else if (path === "member-profile" && memberId) {
    app.appendChild(MemberProfile(memberId));
  } else {
    app.appendChild(render());
  }

  // Activate nav link
  document
    .querySelectorAll(".nav-item")
    .forEach((li) => li.classList.remove("active"));
  const activeLink = document.querySelector(`.nav-item-link[href="/${path}"]`);
  if (activeLink?.parentElement) {
    activeLink.parentElement.classList.add("active");
  }
}
