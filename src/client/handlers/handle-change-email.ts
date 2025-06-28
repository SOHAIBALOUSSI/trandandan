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

    try {
      const response = await fetch("/auth/update-credentials", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      if (response.ok) {
        setTimeout(() => {
          displayToast("email updated successfully", "success", {
            noProgressBar: true,
          });
        }, 800);
      } else {
        setTimeout(() => {
          const errorMsg = UpdateCredentialsRes[result.code];
          displayToast(errorMsg, "error");
        }, 800);
      }
    } catch (error) {
      displayToast(UpdateCredentialsRes.INTERNAL_SERVER_ERROR, "error");
    }
  });
}
