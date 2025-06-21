import { styles } from "@/styles/styles";
import { VerifyCodeRes } from "@/utils/response-messages";

export function verifyOtpCode() {
  const otpForm = document.getElementById(
    "lost-pass-otp-form"
  ) as HTMLFormElement;

  otpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = otpForm.querySelector<HTMLDivElement>("#cta-feedback");
    const submitBtn = otpForm.querySelector<HTMLButtonElement>("#cta-btn");
    const spinner = otpForm.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = otpForm.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const btnLabelText = btnLabel.textContent;

    const otpInputs = otpForm.querySelectorAll<HTMLInputElement>(
      "#lost-pass-otp input"
    );

    const otpCode = Array.from(otpInputs)
      .map((input) => input.value.trim())
      .join("");

    if (otpCode.length !== 6) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = "Please enter a valid 6-digit OTP code.";
      return;
    }

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "verifying...";

    // Start the timer to calculate wait time
    const startTime = Date.now();

    try {
      const response = await fetch("/auth/verify-code", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otpCode: otpCode }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        sessionStorage.setItem("reset_flag", "ok");
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = VerifyCodeRes.CODE_VERIFIED;

          setTimeout(() => {
            history.pushState(null, "", "/password_update");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            VerifyCodeRes[result?.code] ||
            "Error during OTP verification. Please try again.";
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.textContent = errorMsg;
          otpInputs.forEach((input) => {
            input.value = "";
          });
          otpInputs[0].focus();
        }, waitTime);
      }
    } catch (error) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = VerifyCodeRes.INTERNAL_SERVER_ERROR;
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
      }, 1300);
    }
  });
}
