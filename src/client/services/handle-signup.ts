import { styles } from "@/styles/styles";
import { RegisterRes } from "@/utils/response-messages";
import { UserRegister } from "types/types";

export function handleSignUp() {
  const signupForm = document.querySelector<HTMLFormElement>("#signup-form");

  signupForm?.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const feedback =
      signupForm.querySelector<HTMLDivElement>("#signup-feedback");
    const submitBtn =
      signupForm.querySelector<HTMLButtonElement>("#signup-btn");
    const spinner = signupForm.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = signupForm.querySelector<HTMLSpanElement>("#btn-label");

    if (!feedback || !submitBtn || !spinner || !btnLabel) return;

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
    // console.log(`
    // 	Username: ${userInfos.username}
    // 	Email: ${userInfos.email}
    // 	Gender: ${userInfos.gender}
    // 	Password: ${userInfos.password}
    // 	Confirm: ${userInfos.confirmPassword}
    // `);
    // -----------------------------------------------------------

    // Reset feedback and button state
    feedback.textContent = "";
    feedback.className = styles.formMessage;
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "Registering...";

    // Start the timer to calculate wait time
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
          feedback.className = `${styles.formMessage} text-pong-success`;
          feedback.textContent = RegisterRes.USER_REGISTERED;

          setTimeout(() => {
            history.pushState(null, "", "/signin");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1500);
        }, waitTime);
      } else {
        setTimeout(() => {
          const errorMsg =
            RegisterRes[result?.code] ||
            "Error during registration. Please try again.";
          feedback.className = `${styles.formMessage} text-pong-error`;
          feedback.textContent = errorMsg;
        }, waitTime);
      }
    } catch (err) {
      feedback.className = `${styles.formMessage} text-pong-error`;
      feedback.textContent = RegisterRes.INTERNAL_SERVER_ERROR;
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
