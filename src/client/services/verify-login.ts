import { startNotificationListener } from "@/handlers/notifications";
import { displayToast } from "@/utils/display-toast";
import { navigateTo } from "@/utils/navigate-to-link";
import { Verify2FaRes } from "@/utils/response-messages";

export function verifyLogin(mode: string | null) {
  const form = document.getElementById("verify-login-form") as HTMLFormElement;
  if (!form || !mode) return;

  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const submitBtn = form.querySelector<HTMLButtonElement>("#submit-btn");
    const spinner = form.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = form.querySelector<HTMLSpanElement>("#btn-label");
    const otpInputs = form.querySelectorAll<HTMLInputElement>(
      "#verify-login-otp input"
    );

    if (!submitBtn || !spinner || !btnLabel || !otpInputs) return;

    const btnLabelText = btnLabel.textContent;
    const feedbackDelay = 900;
    const redirectDelay = 1500;

    const otpCode = Array.from(otpInputs)
      .map((input) => input.value.trim())
      .join("");

    if (otpCode.length !== 6) {
      displayToast("Please enter a valid 6-digit code.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "verifying...";

    try {
      const response = await fetch(`/2fa/${mode}/verify-login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpCode }),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.removeItem("2faMode");

        startNotificationListener();

        setTimeout(() => {
          displayToast(Verify2FaRes.USER_LOGGED_IN, "success");

          setTimeout(() => {
            navigateTo("/salon");
          }, redirectDelay);
        }, feedbackDelay);
      } else {
        setTimeout(() => {
          const errorMsg =
            Verify2FaRes[result?.code] ||
            "Error during 2fa verification. Please try again.";
          displayToast(errorMsg, "error");
          otpInputs.forEach((input) => {
            input.value = "";
          });
          otpInputs[0].focus();
        }, feedbackDelay);
      }
    } catch (err) {
      displayToast(Verify2FaRes.INTERNAL_SERVER_ERROR, "error");
      otpInputs.forEach((input) => {
        input.value = "";
      });
      otpInputs[0].focus();
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = btnLabelText;
      }, feedbackDelay + 300);
    }
  });
}
