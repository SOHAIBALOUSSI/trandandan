import { styles } from "@/styles/styles";
import { Verify2FaRes } from "@/utils/response-messages";

export function verifyLogin(mode: string | null) {
  const form = document.getElementById("verify-login-form") as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = form.querySelector<HTMLDivElement>("#verify-feedback");
    const submitBtn = form.querySelector<HTMLButtonElement>("#verify-btn");
    const spinner = form.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = form.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const codeInput = form.querySelector(
      "#verification-code"
    ) as HTMLInputElement;
    const code = codeInput.value.trim();

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
        body: JSON.stringify({ otpCode: code }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = Verify2FaRes.USER_LOGGED_IN;

          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            Verify2FaRes[result?.code] ||
            "Error during verify 2fa. Please try again.";
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.textContent = errorMsg;
        }, waitTime);
      }
    } catch (error) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = Verify2FaRes.INTERNAL_SERVER_ERROR;
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "verify";
      }, 1300);
    }
  });
}
