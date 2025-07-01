import { displayToast } from "@/utils/display-toast";
import { UpdateCredentialsRes } from "@/utils/response-messages";

export function handleChangePassword() {
  const form = document.getElementById(
    "change-password-form"
  ) as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const btn = form.querySelector<HTMLButtonElement>("#submit-btn");
    const oldPasswordInput =
      form.querySelector<HTMLInputElement>("#old-password");
    const newPasswordInput =
      form.querySelector<HTMLInputElement>("#new-password");
    const confirmPasswordInput = form.querySelector<HTMLInputElement>(
      "#confirm-new-password"
    );

    if (!btn || !oldPasswordInput || !newPasswordInput || !confirmPasswordInput)
      return;

    const oldPassword = oldPasswordInput?.value.trim();
    const newPassword = newPasswordInput?.value.trim();
    const confirmPassword = confirmPasswordInput?.value.trim();

    if (!oldPassword) {
      oldPasswordInput.focus();
      return;
    }
    if (!newPassword) {
      newPasswordInput.focus();
      return;
    }
    if (!confirmPassword) {
      confirmPasswordInput.focus();
      return;
    }
    if (newPassword !== confirmPassword) {
      confirmPasswordInput.focus();
      displayToast(
        "New password and confirmation do not match. Please try again.",
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
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok && result.statusCode === 200) {
        setTimeout(() => {
          displayToast("password updated successfully", "success");

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
        setTimeout(() => {
          const errorMsg =
            UpdateCredentialsRes[result?.code] ||
            "Error during password change. Please try again.";
          displayToast(errorMsg, "error");
        }, feedbackDelay);
      }
    } catch (err) {
      displayToast(UpdateCredentialsRes.INTERNAL_SERVER_ERROR, "error");
    } finally {
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
    }
  });
}
