import { clearCurrentUser } from "@/utils/user-store";
import { router } from "@/router";
import { displayToast } from "@/utils/display-toast";
import { stopNotificationListener } from "../services/notifications-service";
import { stopChatListener } from "@/services/chat-service";
import { stopDashboardListener } from "@/services/dashboard-service";

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
    stopNotificationListener();
    stopChatListener();
    stopDashboardListener();
    history.replaceState(null, "", "/welcome");
    await router();
  }
}
