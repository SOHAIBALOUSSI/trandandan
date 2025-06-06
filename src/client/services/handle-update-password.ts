import { styles } from "@/styles/styles";
import { Errors } from "@/utils/error-messages";

export function handleUpdatePassword() {
  const form = document.getElementById(
    "update-password-form"
  ) as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = document.querySelector<HTMLDivElement>(
      "#update-password-feedback"
    );
    const submitBtn = document.querySelector<HTMLButtonElement>(
      "#update-password-btn"
    );
    const spinner = document.querySelector<HTMLSpanElement>("#spinner-update");
    const btnLabel =
      document.querySelector<HTMLSpanElement>("#btn-label-update");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const newPasswordInput = document.getElementById(
      "new-password"
    ) as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;
    const password = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const params = { password, confirmPassword };

    feedback.textContent = "";
    feedback.className = styles.formMessage;
    feedback.classList.remove("hidden");
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Updating...";

    const startTime = Date.now();

    try {
      const response = await fetch("/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tempTokenPassword")}`,
        },
        body: JSON.stringify({
          password: params.password,
          confirmPassword: params.confirmPassword,
        }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok) {
        setTimeout(() => {
          feedback.textContent = "Password updated successfully!";
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.classList.remove("hidden");

          setTimeout(() => {
            history.pushState(null, "", "/signin");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            Errors[result?.code] || "Invalid password. Please try again.";
          feedback.textContent = errorMsg;
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.classList.remove("hidden");
        }, waitTime);
      }
    } catch (error) {
      feedback.textContent = Errors.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.classList.remove("hidden");
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "lock it in";
      }, 1300);
    }
  });
}
