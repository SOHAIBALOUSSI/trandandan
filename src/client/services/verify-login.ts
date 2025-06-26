import { styles } from "@/styles/styles";
import { Verify2FaLoginRes } from "@/utils/response-messages";

export function verifyLogin(mode: string | null) {
  const form = document.getElementById("verify-login-form") as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = form.querySelector<HTMLDivElement>("#cta-feedback");
    const submitBtn = form.querySelector<HTMLButtonElement>("#cta-btn");
    const spinner = form.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = form.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const btnLabelText = btnLabel.textContent;

    const otpInputs = form.querySelectorAll<HTMLInputElement>(
      "#verify-login-otp input"
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
      const response = await fetch(`/2fa/${mode}/verify-login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpCode: otpCode }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = Verify2FaLoginRes.USER_LOGGED_IN;

          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            Verify2FaLoginRes[result?.code] ||
            "Error during 2fa verification. Please try again.";
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
      feedback.textContent = Verify2FaLoginRes.INTERNAL_SERVER_ERROR;
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
