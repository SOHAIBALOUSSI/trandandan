import { styles } from "@/styles/styles";
import { LoginRes } from "@/utils/response-messages";

export function handleSignIn() {
  const signInForm = document.querySelector<HTMLFormElement>("#signin-form");

  signInForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback =
      signInForm.querySelector<HTMLDivElement>("#signin-feedback");
    const submitBtn =
      signInForm.querySelector<HTMLButtonElement>("#signin-btn");
    const spinner = signInForm.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = signInForm.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

    const formData = new FormData(signInForm);
    const loginValue = formData.get("login") as string;
    const password = formData.get("password") as string;

    const isEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValue);
    const payload = isEmail
      ? { email: loginValue.trim(), password }
      : { username: loginValue.trim(), password };

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Entering...";

    // Start the timer to calculate wait time
    const startTime = Date.now();

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

      if (response.ok && result.statusCode === 200) {
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = LoginRes.USER_LOGGED_IN;

          localStorage.setItem("auth", "ok");

          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else if (response.ok && result.statusCode === 206) {
        // 2FA Required
        setTimeout(() => {
          feedback.className = `${styles.formMessage} text-pong-warning`;
          feedback.textContent = LoginRes.TWOFA_REQUIRED;

          setTimeout(() => {
            history.pushState(null, "", "/verify_login");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            LoginRes[result?.code] || "Error during login. Please try again.";
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.textContent = errorMsg;
        }, waitTime);
      }
    } catch (err) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = LoginRes.INTERNAL_SERVER_ERROR;
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "enter the lounge";
      }, 1300);
    }
  });
}
