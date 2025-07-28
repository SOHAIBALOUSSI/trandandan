import { Welcome } from "@/views/Welcome";
import { Signin } from "@/views/Signin";
import { Signup } from "@/views/Signup";
import { LostPassword } from "@/views/LostPassword";
import { ResetPassword } from "@/views/ResetPassword";
import { VerifyLogin } from "@/views/VerifyLogin";
import { Home } from "@/views/Home";
import { Game } from "@/views/Game";
import { Dashboard } from "@/views/Dashboard";
import { Members } from "@/views/Members";
import { Chat } from "@/views/Chat";
import { Lounge } from "@/views/Lounge";
import { Profile } from "@/views/Profile";
import { MemberProfile } from "@/views/MemberProfile";
import { Security } from "@/views/Security";
import { Blocked } from "@/views/Blocked";
import { DeleteAccount } from "@/views/DeleteAccount";
import { Logout } from "@/views/Logout";
import { ChangePassword } from "@/views/ChangePassword";
import { ChangeEmail } from "@/views/ChangeEmail";
import { VerifyChangeCredentials } from "@/views/VerifyChangeCredentials";
import { LocalGame } from "@/components/game/LocalGame";
import { RemoteGame } from "@/components/game/RemoteGame";
import { Tournaments } from "@/components/game/Tournaments";
import { getUserProfile } from "@/services/get-user-profile";
import { startNotificationListener } from "@/services/notifications-service";

// Routes and their corresponding components
const routes: Record<string, (id?: number) => HTMLElement> = {
  welcome: Welcome,
  login: Signin,
  register: Signup,
  password_reset: LostPassword,
  password_update: ResetPassword,
  verify_login: VerifyLogin,
  salon: Home,
  arena: Game,
  chamber: Dashboard,
  lounge: Lounge,
  members: Members,
  exit: Logout,
  duel: LocalGame,
  remote: RemoteGame,
  tournament: Tournaments,
  my_profile: Profile,
  security: Security,
  change_password: ChangePassword,
  change_email: ChangeEmail,
  verification: VerifyChangeCredentials,
  muted_players: Blocked,
  wipe_account: DeleteAccount,
  checkout: Logout,
};

// Public pages that don't require authentication
const publicRoutes: string[] = [
  "welcome",
  "login",
  "register",
  "password_reset",
  "password_update",
  "verify_login",
];

// Check if a user is authenticated
async function isAuthenticated(): Promise<boolean> {
  const profile = await getUserProfile();
  if (profile) {
    console.log("Profile fetched in router:", profile);

    return true;
  }
  console.log("erooooor in fetching");
  return false;
}

// Router function to handle navigation and rendering
export async function router(): Promise<void> {
  const app = document.getElementById("app") as HTMLDivElement;
  if (!app) return;

  let path = location.pathname.slice(1);

  let chatRoom: number | undefined;
  let memberId: number | undefined;

  // Detect /chat/:id
  const chatMatch = path.match(/^lounge\/(\d+)$/);
  if (chatMatch) {
    chatRoom = Number(chatMatch[1]);
    path = "chat-room";
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
      startNotificationListener();
    }
    if (!authed) {
      history.replaceState(null, "", "/welcome");
      await router();
      return;
    }
  } else {
    const profile = await getUserProfile();
    if (profile) {
      history.replaceState(null, "", "/salon");
      await router();
      return;
    }
  }

  // Handle unknown routes
  if (!render && path !== "member-profile" && path !== "chat-room") {
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
  if (path === "chat-room" && chatRoom) {
    const chatView = await Chat(chatRoom);
    app.appendChild(chatView);
  } else if (path === "member-profile" && memberId) {
    const memberProfileElem = MemberProfile(memberId);
    memberProfileElem && app.appendChild(memberProfileElem);
  } else {
    app.appendChild(render());
  }
}
