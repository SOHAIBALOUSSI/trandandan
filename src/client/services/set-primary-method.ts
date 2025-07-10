import { Change2FaStateRes } from "@/utils/response-messages";
import { displayToast } from "@/utils/display-toast";

export async function setPrimaryMethod(
  method: "app" | "email",
  onUpdate?: () => void
) {
  try {
    const res = await fetch("/2fa/primary", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method }),
    });
    const data = await res.json();
    console.log(data.code);
    if (!res.ok) {
      displayToast(
        Change2FaStateRes[data.code] || "Error setting primary method",
        "error"
      );
      return;
    }
    displayToast(
      Change2FaStateRes[data.code] || "Primary method updated",
      res.ok ? "success" : "error"
    );
    if (onUpdate) onUpdate();
  } catch (err) {
    displayToast("Set primary method error", "error");
  }
}
