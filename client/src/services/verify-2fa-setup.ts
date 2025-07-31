import { Verify2FaRes } from "@/utils/response-messages";
import { displayToast } from "@/utils/display-toast";

export async function verify2FASetup(
  otpCode: string,
  mode: "app" | "email",
  onSuccess?: () => void
) {
  try {
    const response = await fetch(`/2fa/${mode}/verify-setup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otpCode }),
    });
    const data = await response.json();
    if (response.status === 200) {
      if (onSuccess) onSuccess();
    } else {
      displayToast(Verify2FaRes[data.code], "error");
    }
  } catch {
    displayToast(Verify2FaRes.INTERNAL_SERVER_ERROR, "error");
  }
}
