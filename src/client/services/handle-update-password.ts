import { styles } from "@/styles/styles";
import { UpdatePasswordRes } from "@/utils/response-messages";

export function handleUpdatePassword() {
  const form = document.getElementById(
    "update-password-form"
  ) as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = form.querySelector<HTMLDivElement>("#cta-feedback");
    const submitBtn = form.querySelector<HTMLButtonElement>("#cta-btn");
    const spinner = form.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = form.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const btnLabelText = btnLabel.textContent;

    const password = (
      form.querySelector("#new-password") as HTMLInputElement
    ).value.trim();
    const confirmPassword = (
      form.querySelector("#confirm-new-password") as HTMLInputElement
    ).value.trim();

    const payload = {
      password: password,
      confirmPassword: confirmPassword,
    };

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "updating...";

    // Start the timer to calculate wait time
    const startTime = Date.now();

    try {
      const response = await fetch("/auth/update-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = UpdatePasswordRes.USER_LOGGED_IN;

          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            UpdatePasswordRes[result?.code] ||
            "Error during password update. Please try again.";
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.textContent = errorMsg;
        }, waitTime);
      }
    } catch (error) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = UpdatePasswordRes.INTERNAL_SERVER_ERROR;
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
