import { Disable2FaRes } from "@/utils/response-messages";
import { displayToast } from "@/utils/display-toast";

export async function disable2FA(mode: "app" | "email", onUpdate?: () => void) {
  try {
    const res = await fetch("/2fa/disable", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method: mode }),
    });
    const data = await res.json();
    displayToast(
      Disable2FaRes[data.code] || "2FA disabled",
      res.ok ? "success" : "error"
    );
    if (onUpdate) onUpdate();
  } catch (error) {
    displayToast("Disable 2FA error", "error");
  }
}
