import { handleLogout } from "@/services/handle-logout";

export function Logout(): HTMLElement {
  const section = document.createElement("section");
  section.innerText = "Logging out...";

  // Defer logout until after render
  setTimeout(() => {
    handleLogout();
  }, 0);

  return section;
}
