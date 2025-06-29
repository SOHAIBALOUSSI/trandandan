import { Enable2FaRes } from "@/utils/response-messages";
import { displayToast } from "@/utils/display-toast";

export async function enable2FA(mode: "app" | "email", onUpdate?: () => void) {
  try {
    const res = await fetch("/2fa/enable", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method: mode }),
    });
    const data = await res.json();
    displayToast(
      Enable2FaRes[data.code] || "2FA enabled",
      res.ok ? "success" : "error"
    );
    if (onUpdate) onUpdate();
  } catch (error) {
    displayToast("Enable 2FA error", "error");
  }
}
