import { handleLogout } from "@/services/handle-logout";

export function Logout() {
  // Call the handleLogout function to perform the logout operation
  handleLogout();

  const section = document.createElement("section");
  return section;
}
