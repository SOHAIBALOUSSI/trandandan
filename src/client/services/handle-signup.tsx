import { styles } from "@/styles/styles";

export function handleSignUp() {
  const signupForm = document.querySelector<HTMLFormElement>("#signup-form");
  const feedback = document.querySelector<HTMLDivElement>("#signup-feedback");
  const submitBtn = document.querySelector<HTMLButtonElement>("#signup-btn");
  const spinner = document.querySelector<HTMLSpanElement>("#spinner");
  const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label");

  if (!signupForm || !feedback || !submitBtn || !spinner || !btnLabel) return;

  signupForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const username = (
      signupForm.querySelector("#username") as HTMLInputElement
    ).value.trim();
    const email = (
      signupForm.querySelector("#email") as HTMLInputElement
    ).value.trim();
    const password = (signupForm.querySelector("#password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      signupForm.querySelector("#confirm-password") as HTMLInputElement
    ).value;

    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Registering...";

    const startTime = Date.now();

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed); // Ensure 1.2s minimum spinner

      if (response.ok) {
        setTimeout(() => {
          feedback.textContent =
            "Welcome, champion! Your racket has been registered.";
          feedback.className = `${styles.formMessage} text-pong-success block`;

          setTimeout(() => {
            history.pushState(null, "", "/signin");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          feedback.textContent =
            result.message ||
            "Couldn’t register your racket. Try again, champ.";
          feedback.className = `${styles.formMessage} text-pong-error block`;
        }, waitTime);
      }
    } catch (err) {
      feedback.textContent = "Club doors are jammed! Try again in a moment.";
      feedback.className = `${styles.formMessage} text-pong-error block`;
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "register your racket";
      }, 1300);
    }
  });
}
