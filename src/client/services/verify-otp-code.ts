import { displayToast } from "@/utils/display-toast";
import { VerifyCodeRes } from "@/utils/response-messages";

export function verifyOtpCode() {
  const otpForm = document.getElementById(
    "lost-pass-otp-form"
  ) as HTMLFormElement;
  if (!otpForm) return;

  otpForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const submitBtn = otpForm.querySelector<HTMLButtonElement>("#submit-btn");
    const spinner = otpForm.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = otpForm.querySelector<HTMLSpanElement>("#btn-label");
    const otpInputs = otpForm.querySelectorAll<HTMLInputElement>(
      "#lost-pass-otp input"
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
      const response = await fetch("/auth/verify-code", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpCode: otpCode }),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem("reset_flag", "ok");
        setTimeout(() => {
          displayToast(VerifyCodeRes.CODE_VERIFIED, "success");
          setTimeout(() => {
            history.pushState(null, "", "/password_update");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, redirectDelay);
        }, feedbackDelay);
      } else {
        setTimeout(() => {
          const errorMsg =
            VerifyCodeRes[result?.code] ||
            "Error during OTP verification. Please try again.";
          displayToast(errorMsg, "error");
          otpInputs.forEach((input) => {
            input.value = "";
          });
          otpInputs[0].focus();
        }, feedbackDelay);
      }
    } catch (error) {
      displayToast(VerifyCodeRes.INTERNAL_SERVER_ERROR, "error");
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
