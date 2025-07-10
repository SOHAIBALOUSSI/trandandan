import { clearCurrentUser } from "@/utils/user-store";
import { router } from "@/router";
import { displayToast } from "@/utils/display-toast";
import { stopNotificationListener } from "./notifications";

export async function handleLogout(): Promise<void> {
  try {
    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    displayToast(
      "The club’s lights are out at the moment. Try again shortly.",
      "error"
    );
  } finally {
    clearCurrentUser();
    history.replaceState(null, "", "/welcome");
    stopNotificationListener();
    await router();
  }
}
