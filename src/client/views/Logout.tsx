import { handleLogout } from "@/services/handle-logout";

let hasLoggedOut: boolean = false;

export function Logout(): HTMLElement {
  const section = document.createElement("section");
  section.innerText = "Logging out...";

  if (!hasLoggedOut) {
    hasLoggedOut = true;
    setTimeout(() => {
      handleLogout();
    }, 0);
  }

  return section;
}
