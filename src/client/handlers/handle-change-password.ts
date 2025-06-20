import { styles } from "@/styles/styles";

export function handleChangePassword() {
  const form = document.getElementById(
    "change-password-form"
  ) as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const passwordInput = form.querySelector<HTMLInputElement>("#password");
    const confirmPasswordInput =
      form.querySelector<HTMLInputElement>("#confirm-password");
    const feedback = form.querySelector<HTMLDivElement>("#cta-feedback");
    const submitBtn = form.querySelector<HTMLButtonElement>("#cta-btn");
    const spinner = form.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = form.querySelector<HTMLSpanElement>("#btn-label");

    if (
      !passwordInput ||
      !confirmPasswordInput ||
      !feedback ||
      !submitBtn ||
      !spinner ||
      !btnLabel
    ) {
      return;
    }

    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (password.length < 8) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = "Password must be at least 8 characters long.";
      return;
    }

    if (password !== confirmPassword) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = "Passwords do not match.";
      return;
    }

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Changing...";
  });
}
