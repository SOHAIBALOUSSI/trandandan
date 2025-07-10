import { displayToast } from "@/utils/display-toast";
import { navigateTo } from "@/utils/navigate-to-link";
import { UpdateCredentialsRes } from "@/utils/response-messages";

export function handleChangeEmail() {
  const form = document.getElementById("change-email-form") as HTMLFormElement;
  const changeEmailInput = document.getElementById("email") as HTMLInputElement;
  if (!form || !changeEmailInput) return;

  const savedEmail = localStorage.getItem("changedemailInput");
  if (savedEmail) changeEmailInput.value = savedEmail;

  changeEmailInput.addEventListener("input", () => {
    localStorage.setItem("changedemailInput", changeEmailInput.value);
  });

  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const emailInput = form.querySelector<HTMLInputElement>("#email");
    const btn = form.querySelector<HTMLButtonElement>("#submit-btn");

    if (!emailInput || !btn) return;

    const email = emailInput.value.trim();

    if (!email) {
      emailInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailInput.focus();
      displayToast(
        "That doesn’t look like a valid email. Check the format and try again.",
        "error"
      );
      return;
    }

    const feedbackDelay = 900;
    const redirectDelay = 1500;

    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");

    try {
      const response = await fetch("/auth/update-credentials", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      if (response.ok && result.statusCode === 200) {
        setTimeout(() => {
          displayToast(UpdateCredentialsRes.EMAIL_UPDATED, "success");

          setTimeout(() => {
            navigateTo("/security");
          }, redirectDelay);
        }, feedbackDelay);
      } else if (response.ok && result.statusCode === 206) {
        sessionStorage.setItem("2faModeUpdate", result.data?.twoFaType);
        setTimeout(() => {
          displayToast(UpdateCredentialsRes.TWOFA_REQUIRED, "warning");
          setTimeout(() => {
            navigateTo("/verification");
          }, redirectDelay);
        }, feedbackDelay);
      } else {
        const errorMsg =
          UpdateCredentialsRes[result.code] || "Failed to update email.";
        displayToast(errorMsg, "error");
        emailInput.focus();
      }
    } catch (err) {
      displayToast(UpdateCredentialsRes.INTERNAL_SERVER_ERROR, "error");
      emailInput.focus();
    } finally {
      setTimeout(() => {
        btn.disabled = false;
        btn.removeAttribute("aria-busy");
      }, feedbackDelay + 300);
    }
  });
}
