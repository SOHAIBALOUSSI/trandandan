import { clearCurrentUser } from "@/utils/user-store";
import { router } from "@/router";

export async function handleLogout(): Promise<void> {
  try {
    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error(err);
  } finally {
    clearCurrentUser();
    history.replaceState(null, "", "/welcome");
    await router();
  }
}
