import { styles } from "@/styles/styles";

export function handleSignIN() {
  const signInForm = document.querySelector<HTMLFormElement>("#signin-form");
  const feedback = document.querySelector<HTMLDivElement>("#signin-feedback");
  const submitBtn = document.querySelector<HTMLButtonElement>("#signin-btn");
  const spinner = document.querySelector<HTMLSpanElement>("#spinner-in");
  const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label-in");

  if (!signInForm || !feedback || !submitBtn || !spinner || !btnLabel) return;

  // Error messages for the signin process
  const signinErrorMessages: Record<string, string> = {
    INVALID_CREDENTIALS: "No racket found. Check your details and swing again.",
    INVALID_PASSWORD:
      "Invalid paddle pass. Check your details and swing again.",
    INTERNAL_SERVER_ERROR: "Club doors are jammed! Try again in a moment.",
  };

  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signInForm);
    const loginValue = formData.get("login") as string;
    const password = formData.get("password") as string;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValue);
    const payload = isEmail
      ? { email: loginValue, password }
      : { username: loginValue, password };

    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Entering...";

    const startTime = Date.now();

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed); // Ensure 1.2s minimum spinner

      if (response.ok) {
        setTimeout(() => {
          feedback.textContent = "Welcome back, champ! Entering the lounge...";
          feedback.className = `${styles.formMessage} text-pong-success block`;

          localStorage.setItem("auth", "true");
          result.data.accessToken &&
            localStorage.setItem("accessToken", result.data.accessToken);
          result.data.refreshToken &&
            localStorage.setItem("refreshToken", result.data.refreshToken);

          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else if (response.status === 206) {
        /*
			still some work to do here 
		*/
        setTimeout(() => {
          result.tempToken &&
            localStorage.setItem("tempToken", result.tempToken);
          feedback.textContent =
            "Security check! Time to prove it’s really you.";
          feedback.className = `${styles.formMessage} text-pong-warning block`;
          history.pushState(null, "", "/2fa/verify-login");
          window.dispatchEvent(new PopStateEvent("popstate"));
        }, waitTime);
      } else {
        setTimeout(() => {
          const msg =
            signinErrorMessages[result?.code] ||
            "Invalid paddle pass. Check your details and swing again.";
          feedback.textContent = msg;
          feedback.className = `${styles.formMessage} text-pong-error block`;
        }, waitTime);
      }
    } catch (err) {
      feedback.textContent = signinErrorMessages.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error block`;
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
