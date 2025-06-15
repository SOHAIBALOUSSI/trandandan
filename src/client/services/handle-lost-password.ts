import { styles } from "@/styles/styles";
import { LostPasswordRes } from "@/utils/response-messages";

export function handleLostPassword() {
  const form = document.getElementById("lost-password-form") as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = form.querySelector<HTMLDivElement>("#cta-feedback");
    const submitBtn = form.querySelector<HTMLButtonElement>("#cta-btn");
    const spinner = form.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = form.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const btnLabelText = btnLabel.textContent;

    const otpForm = document.getElementById(
      "lost-pass-otp-form"
    ) as HTMLFormElement;

    // Get email value from input
    const emailInput = form.querySelector(
      "#reset-pass-email"
    ) as HTMLInputElement;
    const email = emailInput.value.trim();

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "sending email...";

    // Start the timer to calculate wait time
    const startTime = Date.now();

    try {
      const response = await fetch("/auth/lost-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = LostPasswordRes.CODE_SENT;
          emailInput.value = "";
          form.classList.add("hidden");
          otpForm?.classList.remove("hidden");
          otpForm?.classList.add("flex");
          otpForm?.querySelector("input")?.focus();
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            LostPasswordRes[result?.code] ||
            "Error during lost password request. Please try again.";
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.textContent = errorMsg;
        }, waitTime);
      }
    } catch (error) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = LostPasswordRes.INTERNAL_SERVER_ERROR;
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
