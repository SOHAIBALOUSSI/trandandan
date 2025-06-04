import { styles } from "@/styles/styles";
import { Errors } from "@/utils/error-messages";
import { UserRegister } from "types/UserRegister";

export function handleSignUp() {
  const signupForm = document.querySelector<HTMLFormElement>("#signup-form");
  const feedback = document.querySelector<HTMLDivElement>("#signup-feedback");
  const submitBtn = document.querySelector<HTMLButtonElement>("#signup-btn");
  const spinner = document.querySelector<HTMLSpanElement>("#spinner");
  const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label");

  if (!signupForm || !feedback || !submitBtn || !spinner || !btnLabel) return;

  signupForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    // Extract User Infos from the singup Form
    const userInfos: UserRegister = {
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

    // -----------------------------------------------------------
    console.log(`
		Username: ${userInfos.username}
		Email: ${userInfos.email} 
		Gender: ${userInfos.gender}
		Password: ${userInfos.password}
		Confirm: ${userInfos.confirmPassword}
	`);
    // -----------------------------------------------------------

    // Reset feedback and button state
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
        body: JSON.stringify(userInfos),
      });

      const result = await response.json();

      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, 1200 - elapsed);

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
        setTimeout(() => {
          const errorMsg =
            Errors[result?.code] ||
            "Couldn’t register your racket. Try again, champ.";
          feedback.textContent = errorMsg;
          feedback.className = `${styles.formMessage} text-pong-error`;
        }, waitTime);
      }
    } catch (err) {
      feedback.textContent = Errors.INTERNAL_SERVER_ERROR;
      feedback.className = `${styles.formMessage} text-pong-error`;
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
