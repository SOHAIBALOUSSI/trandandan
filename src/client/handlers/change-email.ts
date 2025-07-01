import { displayToast } from "@/utils/display-toast";
import { UpdateCredentialsRes } from "@/utils/response-messages";

export function handleChangeEmail() {
  const form = document.getElementById("change-email-form") as HTMLFormElement;
  if (!form) return;

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
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.statusCode === 200) {
        setTimeout(() => {
          displayToast("Email updated successfully.", "success");
          setTimeout(() => {
            history.pushState(null, "", "/security");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, redirectDelay);
        }, feedbackDelay);
      } else if (response.ok && result.statusCode === 206) {
        sessionStorage.setItem("2faModeUpdate", result.data?.twoFaType);
        setTimeout(() => {
          displayToast(UpdateCredentialsRes.TWOFA_REQUIRED, "warning");
          setTimeout(() => {
            history.pushState(null, "", "/verification");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, redirectDelay);
        }, feedbackDelay);
      } else {
        const errorMsg =
          UpdateCredentialsRes[result.code] || "Failed to update email.";
        displayToast(errorMsg, "error");
        emailInput.focus();
      }
    } catch (error) {
      displayToast(UpdateCredentialsRes.INTERNAL_SERVER_ERROR, "error");
      emailInput.focus();
    } finally {
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
    }
  });
}
