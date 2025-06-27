import { displayToast } from "@/utils/display-toast";
import { RegisterRes } from "@/utils/response-messages";
import { UserRegister } from "types/types";

export function handleSignUp() {
  const signupForm = document.getElementById("signup-form") as HTMLFormElement;
  if (!signupForm) return;

  signupForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const submitBtn =
      signupForm.querySelector<HTMLButtonElement>("#submit-btn");
    const spinner = signupForm.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = signupForm.querySelector<HTMLSpanElement>("#btn-label");
    const usernameInput =
      signupForm.querySelector<HTMLInputElement>("#username");
    const emailInput = signupForm.querySelector<HTMLInputElement>("#email");
    const genderInput = signupForm.querySelector<HTMLSelectElement>("#gender");
    const passwordInput =
      signupForm.querySelector<HTMLInputElement>("#password");
    const confirmPasswordInput =
      signupForm.querySelector<HTMLInputElement>("#confirm-password");

    if (
      !submitBtn ||
      !spinner ||
      !btnLabel ||
      !usernameInput ||
      !emailInput ||
      !genderInput ||
      !passwordInput ||
      !confirmPasswordInput
    )
      return;

    const btnLabelText = btnLabel.textContent;
    const feedbackDelay = 900;
    const redirectDelay = 1500;

    const userInfos: UserRegister = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      gender:
        genderInput.value === "male"
          ? "M"
          : genderInput.value === "female"
          ? "F"
          : "",
      password: passwordInput.value.trim(),
      confirmPassword: confirmPasswordInput.value.trim(),
    };

    if (!userInfos.username) {
      usernameInput.focus();
      return;
    }
    if (!userInfos.email) {
      emailInput.focus();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfos.email)) {
      emailInput.focus();
      displayToast(
        "That doesn’t look like a valid email. Check the format and try again.",
        "error"
      );
      return;
    }
    if (!userInfos.gender) {
      genderInput.focus();
      return;
    }
    if (!userInfos.password) {
      passwordInput.focus();
      return;
    }
    if (!userInfos.confirmPassword) {
      confirmPasswordInput.focus();
      return;
    }
    if (userInfos.password !== userInfos.confirmPassword) {
      confirmPasswordInput.focus();
      confirmPasswordInput.value = "";
      displayToast(RegisterRes.UNMATCHED_PASSWORDS, "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "registering...";

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfos),
      });

      const result = await response.json();

      if (response.ok) {
        setTimeout(() => {
          displayToast(RegisterRes.USER_REGISTERED, "success", {
            noProgressBar: true,
          });
          setTimeout(() => {
            history.pushState(null, "", "/signin");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, redirectDelay);
        }, feedbackDelay);
      } else {
        setTimeout(() => {
          const errorMsg =
            RegisterRes[result?.code] ||
            "Error during registration. Please try again.";
          displayToast(errorMsg, "error");
        }, feedbackDelay);
      }
    } catch (err) {
      displayToast(RegisterRes.INTERNAL_SERVER_ERROR, "error");
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
        spinner.classList.add("hidden");
        btnLabel.textContent = btnLabelText;
      }, feedbackDelay + 300);
    }
  });
}
