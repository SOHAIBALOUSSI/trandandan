import { displayToast } from "@/utils/display-toast";
import { navigateTo } from "@/utils/navigate-to-link";
import { VerifyUpdateCredentialsRes } from "@/utils/response-messages";
import { clearCurrentUser } from "@/utils/user-store";

export function handleVerifyCredentials() {
  const verifyForm = document.getElementById(
    "verify-otp-form"
  ) as HTMLFormElement;
  if (!verifyForm) return;

  verifyForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const isPassword = sessionStorage.getItem("passwordUpdated") === "true";

    const btn = verifyForm.querySelector<HTMLButtonElement>("#submit-btn");
    const codeInput = verifyForm.querySelector<HTMLInputElement>("#otp");

    if (!btn || !codeInput) return;

    const code = codeInput.value.trim();

    if (!code || code.length != 6) {
      displayToast("Please enter a valid 6-digit code.", "error");
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
        sessionStorage.removeItem("2faModeUpdate");
		sessionStorage.removeItem("passwordUpdated");
        setTimeout(() => {
          isPassword
            ? displayToast(
                VerifyUpdateCredentialsRes.PASSWORD_UPDATED,
                "success"
              )
            : displayToast(VerifyUpdateCredentialsRes.EMAIL_UPDATED, "success");

          setTimeout(() => {
            isPassword ? navigateTo("/login") : navigateTo("/security");
            if (isPassword) {
              fetch("/auth/logout", {
                method: "POST",
                credentials: "include",
              }).then(() => {
                clearCurrentUser();
              });
              sessionStorage.removeItem("passwordUpdated");
            }
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
      }, feedbackDelay + 300);
    }
  });
}
