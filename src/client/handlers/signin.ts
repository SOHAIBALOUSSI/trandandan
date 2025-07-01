import { displayToast } from "@/utils/display-toast";
import { LoginRes } from "@/utils/response-messages";

export function handleSignIn() {
  const signInForm = document.getElementById("signin-form") as HTMLFormElement;
  if (!signInForm) return;

  signInForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const submitBtn =
      signInForm.querySelector<HTMLButtonElement>("#submit-btn");
    const spinner = signInForm.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = signInForm.querySelector<HTMLSpanElement>("#btn-label");
    const loginInput = signInForm.querySelector<HTMLInputElement>("#login");
    const passwordInput =
      signInForm.querySelector<HTMLInputElement>("#password");

    if (!submitBtn || !spinner || !btnLabel || !loginInput || !passwordInput)
      return;

    const btnLabelText = btnLabel.textContent;
    const feedbackDelay = 900;
    const redirectDelay = 1500;

    const formData = new FormData(signInForm);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    if (!login.trim()) {
      loginInput.focus();
      return;
    }
    if (!password.trim()) {
      passwordInput.focus();
      return;
    }

    const isEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    const payload = isEmail
      ? { email: login.trim(), password }
      : { username: login.trim(), password };

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "entering...";

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.statusCode === 200) {
        setTimeout(() => {
          displayToast(LoginRes.USER_LOGGED_IN, "success", {
            noProgressBar: true,
          });
          setTimeout(() => {
            history.pushState(null, "", "/salon");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, redirectDelay);
        }, feedbackDelay);
      } else if (response.ok && result.statusCode === 206) {
        sessionStorage.setItem("2faMode", result.data?.twoFaType);

        setTimeout(() => {
          displayToast(LoginRes.TWOFA_REQUIRED, "warning", {
            noProgressBar: true,
          });
          setTimeout(() => {
            history.pushState(null, "", "/verify_login");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, redirectDelay);
        }, feedbackDelay);
      } else {
        setTimeout(() => {
          const errorMsg =
            LoginRes[result?.code] || "Error during login. Please try again.";
          displayToast(errorMsg, "error");
        }, feedbackDelay);
      }
    } catch (err) {
      displayToast(LoginRes.INTERNAL_SERVER_ERROR, "error");
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
