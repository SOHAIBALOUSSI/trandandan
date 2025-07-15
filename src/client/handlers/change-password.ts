import { displayToast } from "@/utils/display-toast";
import { navigateTo } from "@/utils/navigate-to-link";
import { UpdateCredentialsRes } from "@/utils/response-messages";
import { clearCurrentUser } from "@/utils/user-store";

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
      displayToast(
        "New password and confirmation do not match. Please try again.",
        "error"
      );
      confirmPasswordInput.value = "";
      confirmPasswordInput.focus();
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
          displayToast(UpdateCredentialsRes.PASSWORD_UPDATED, "success");

          setTimeout(() => {
            navigateTo("/login");
            fetch("/auth/logout", {
              method: "POST",
              credentials: "include",
            })
              .then(() => {
                clearCurrentUser();
              })
              .catch(() => {
                displayToast(
                  "The club’s lights are out at the moment. Try again shortly.",
                  "error"
                );
              });
          }, redirectDelay);
        }, feedbackDelay);
      } else if (response.ok && result.statusCode === 206) {
        sessionStorage.setItem("passwordUpdated", "true");
        sessionStorage.setItem("2faModeUpdate", result.data?.twoFaType);

        setTimeout(() => {
          displayToast(UpdateCredentialsRes.TWOFA_REQUIRED, "warning");
          setTimeout(() => {
            navigateTo("/verification");
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
      setTimeout(() => {
        btn.disabled = false;
        btn.removeAttribute("aria-busy");
      }, feedbackDelay + 300);
    }
  });
}
