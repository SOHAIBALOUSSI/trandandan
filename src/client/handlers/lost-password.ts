import { displayToast } from "@/utils/display-toast";
import { LostPasswordRes } from "@/utils/response-messages";

export function handleLostPassword() {
  const form = document.getElementById("lost-password-form") as HTMLFormElement;
  const otpForm = document.getElementById(
    "lost-pass-otp-form"
  ) as HTMLFormElement;
  if (!form || !otpForm) return;

  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const submitBtn = form.querySelector<HTMLButtonElement>("#submit-btn");
    const spinner = form.querySelector<HTMLSpanElement>("#spinner");
    const btnLabel = form.querySelector<HTMLSpanElement>("#btn-label");
    const emailInput =
      form.querySelector<HTMLInputElement>("#reset-pass-email");

    if (!submitBtn || !spinner || !btnLabel || !emailInput) return;

    const btnLabelText = btnLabel.textContent;
    const feedbackDelay = 900;

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
        "error",
        { noProgressBar: true }
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    spinner.classList.remove("hidden");
    btnLabel.textContent = "sending email...";

    try {
      const response = await fetch("/auth/lost-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      if (response.ok) {
        setTimeout(() => {
          displayToast(LostPasswordRes.CODE_SENT, "success", {
            noProgressBar: true,
          });
          emailInput.value = "";
          form.classList.add("hidden");
          otpForm.classList.remove("hidden");
          otpForm.classList.add("flex");
          otpForm.querySelector("input")?.focus();
        }, feedbackDelay);
      } else {
        setTimeout(() => {
          const errorMsg =
            LostPasswordRes[result?.code] ||
            "Error during lost password request. Please try again.";
          displayToast(errorMsg, "error", { noProgressBar: true });
        }, feedbackDelay);
      }
    } catch (error) {
      displayToast(LostPasswordRes.INTERNAL_SERVER_ERROR, "error", {
        noProgressBar: true,
      });
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
