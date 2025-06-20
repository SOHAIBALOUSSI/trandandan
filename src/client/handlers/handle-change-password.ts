import { styles } from "@/styles/styles";
import { UpdateCredentialsRes } from "@/utils/response-messages";

export function handleChangePassword() {
  const form = document.getElementById(
    "change-password-form"
  ) as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = form.querySelector<HTMLDivElement>("#cta-feedback");
    const submitBtn = form.querySelector<HTMLButtonElement>("#cta-btn");
    const spinner = form.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = form.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const btnLabelText = btnLabel.textContent;

    const passwordInput = form.querySelector<HTMLInputElement>("#password");
    const confirmPasswordInput =
      form.querySelector<HTMLInputElement>("#confirm-password");

    const password = passwordInput?.value.trim();
    const confirmPassword = confirmPasswordInput?.value.trim();

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Changing...";

    // Start the timer to calculate wait time
    const startTime = Date.now();

    try {
      const response = await fetch("/auth/update-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          password: password,
          confirmPassword: confirmPassword,
        }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok && result.statusCode === 200) {
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = UpdateCredentialsRes.CREDENTIALS_UPDATED;

          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else if (response.ok && result.statusCode === 206) {
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-warning`;
          feedback.textContent = UpdateCredentialsRes.TWOFA_REQUIRED;
          setTimeout(() => {
            history.pushState(null, "", "/verification");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            UpdateCredentialsRes[result?.code] ||
            "Error during password change. Please try again.";
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.textContent = errorMsg;
        }, waitTime);
      }
    } catch (err) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = UpdateCredentialsRes.INTERNAL_SERVER_ERROR;
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        spinner.classList.add("hidden");
        btnLabel.textContent = btnLabelText;
      }, 1300);
    }
  });
}
