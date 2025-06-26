import { Primary2FaMethodRes } from "@/utils/response-messages";
import { displayToast } from "@/utils/display-toast";

export async function setPrimaryMethod(
  mode: "app" | "email",
  onUpdate?: () => void
) {
  try {
    const res = await fetch("/2fa/primary", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method: mode }),
    });
    const data = await res.json();
    displayToast(
      Primary2FaMethodRes[data.code] || "Primary method updated",
      res.ok ? "success" : "error"
    );
    if (onUpdate) onUpdate();
  } catch (error) {
    displayToast("Set primary method error", "error");
  }
}
