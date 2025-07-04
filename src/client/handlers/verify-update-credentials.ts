import { displayToast } from "@/utils/display-toast";
import { VerifyUpdateCredentialsRes } from "@/utils/response-messages";

export function handleVerifyCredentials() {
  const verifyForm = document.getElementById(
    "verify-otp-form"
  ) as HTMLFormElement;
  if (!verifyForm) return;

  verifyForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const btn = verifyForm.querySelector<HTMLButtonElement>("#submit-btn");
    const codeInput = verifyForm.querySelector<HTMLInputElement>("#otp");

    if (!btn || !codeInput) return;

    const code = codeInput.value.trim();

    if (!code) {
      codeInput.focus();
      return;
    }

    const feedbackDelay = 900;
    const redirectDelay = 1500;

    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");

    try {
      const response = await fetch("/auth/verify-update-credentials", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpCode: code }),
      });

      const result = await response.json();

      if (response.ok) {
        setTimeout(() => {
          displayToast(
            VerifyUpdateCredentialsRes.CREDENTIALS_UPDATED,
            "success"
          );
          setTimeout(() => {
            history.pushState(null, "", "/security");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, redirectDelay);
        }, feedbackDelay);
      } else {
        const errorMsg =
          VerifyUpdateCredentialsRes[result.code] ||
          "Failed to verify credentials. Please try again.";
        displayToast(errorMsg, "error");
        codeInput.focus();
      }
    } catch (err) {
      displayToast(VerifyUpdateCredentialsRes.INTERNAL_SERVER_ERROR, "error");
    } finally {
      setTimeout(() => {
        btn.disabled = false;
        btn.removeAttribute("aria-busy");
      }, feedbackDelay);
    }
  });
}
