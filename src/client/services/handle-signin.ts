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
    INVALID_CREDENTIALS:
      "No matching racket in the locker room. Double-check your grip and try again.",
    INVALID_PASSWORD:
      "Wrong paddle pass — take another shot after checking your swing.",
    INTERNAL_SERVER_ERROR:
      "The court lights are out. Give it a moment and rally back.",
  };

  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signInForm);
    const loginValue = formData.get("login") as string;
    const password = formData.get("password") as string;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValue);
    const payload = isEmail
      ? { email: loginValue.trim(), password }
      : { username: loginValue.trim(), password };

    console.log(payload);

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Entering...";

    // Start the timer for spinner delay
    const startTime = Date.now();

    try {
      // Send the login request
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
          feedback.className = `${styles.formMessage} text-pong-success`;

          // Store tokens in localStorage
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
			Handle partial success (2FA required)
		 	/app/verify-login
		*/
      } else {
        // Handle error responses
        setTimeout(() => {
          const msg =
            signinErrorMessages[result?.code] ||
            "Invalid paddle pass. Check your details and swing again.";
          feedback.textContent = msg;
          feedback.className = `${styles.formMessage} text-pong-error`;
        }, waitTime);
      }
    } catch (err) {
      // Handle unexpected errors
      feedback.textContent = signinErrorMessages.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error block`;
    } finally {
      // Reset button state after processing
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "enter the lounge";
      }, 1300);
    }
  });
}
