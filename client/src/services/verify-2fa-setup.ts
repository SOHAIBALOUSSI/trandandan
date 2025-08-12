import { Verify2FaRes } from "@/utils/response-messages";
import { displayToast } from "@/utils/display-toast";

export async function verify2FASetup(
  otpCode: string,
  mode: "app" | "email",
  onSuccess?: (isPrimary: boolean) => void
) {
  try {
    const response = await fetch(`/2fa/${mode}/verify-setup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otpCode }),
    });

    const data = await response.json();

    const isPrimary = data.data.isPrimary === true;

    if (response.status === 200) {
      if (onSuccess) onSuccess(isPrimary);
    } else {
      displayToast(Verify2FaRes[data.code], "error");
    }
  } catch {
    displayToast(Verify2FaRes.INTERNAL_SERVER_ERROR, "error");
  }
}
