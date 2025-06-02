import { styles } from "@/styles/styles";

export function handleSignUp() {
  const signupForm = document.querySelector<HTMLFormElement>("#signup-form");
  const feedback = document.querySelector<HTMLDivElement>("#signup-feedback");
  const submitBtn = document.querySelector<HTMLButtonElement>("#signup-btn");
  const spinner = document.querySelector<HTMLSpanElement>("#spinner");
  const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label");

  if (!signupForm || !feedback || !submitBtn || !spinner || !btnLabel) return;

  //  Error messages for the signup process
  const signupErrorMessages: Record<string, string> = {
    UNMATCHED_PASSWORDS: "Passwords don’t match. Recheck your grip.",
    PASSWORD_POLICY:
      "Your password needs more training: 8+ characters with upper, lower, number, and a special move.",
    FST_ERR_VALIDATION:
      "Your form is over the line — keep username and password under 15 characters.",
    USER_EXISTS: "This racket is already in the club. Try signing in.",
    PROFILE_CREATION_FAILED:
      "We couldn’t get your locker set up. Give it another swing.",
    INTERNAL_SERVER_ERROR:
      "The club’s having a power outage. Try again shortly.",
  };

  signupForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    // User Interface
    interface User {
      username: string;
      email: string;
      gender: string;
      password: string;
      confirmPassword: string;
    }

    // Extract User Infos from the singup Form
    const userInfos: User = {
      username: (
        signupForm.querySelector("#username") as HTMLInputElement
      ).value.trim(),
      email: (
        signupForm.querySelector("#email") as HTMLInputElement
      ).value.trim(),
      gender:
        (
          signupForm.querySelector(
            'input[name="gender"]:checked'
          ) as HTMLInputElement
        ).value === "male"
          ? "M"
          : "F",
      password: (
        signupForm.querySelector("#password") as HTMLInputElement
      ).value.trim(),
      confirmPassword: (
        signupForm.querySelector("#confirm-password") as HTMLInputElement
      ).value.trim(),
    };

    console.log(`
	Username: ${userInfos.username}
	Email: ${userInfos.email} 
	Gender: ${userInfos.gender}
	Password: ${userInfos.password}
	Confirm: ${userInfos.confirmPassword}
	`);

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Registering...";

    // Start the timer for spinner delay
    const startTime = Date.now();

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfos),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed); // Ensure 1.2s minimum spinner

      if (response.ok) {
        setTimeout(() => {
          feedback.textContent =
            "Welcome, champion! Your racket has been registered.";
          feedback.className = `${styles.formMessage} text-pong-success`;

          setTimeout(() => {
            history.pushState(null, "", "/signin");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        // Handle specific error codes
        setTimeout(() => {
          const msg =
            signupErrorMessages[result?.code] ||
            "Couldn’t register your racket. Try again, champ.";
          feedback.textContent = msg;
          feedback.className = `${styles.formMessage} text-pong-error`;
        }, waitTime);
      }
    } catch (err) {
      // Handle unexpected errors
      feedback.textContent = signupErrorMessages.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error`;
    } finally {
      // Reset button state after processing
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = "register your racket";
      }, 1300);
    }
  });
}
