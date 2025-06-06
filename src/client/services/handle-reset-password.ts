export function handleResetPassword() {
  const form = document.querySelector<HTMLFormElement>("#reset-password-form");
  const otpForm = document.querySelector<HTMLFormElement>("#otp-form");
  const feedback = document.querySelector<HTMLDivElement>("#reset-feedback");
  const submitBtn = document.querySelector<HTMLButtonElement>(
    "#reset-password-btn"
  );
  const spinner = document.querySelector<HTMLSpanElement>("#spinner-reset");
  const btnLabel = document.querySelector<HTMLSpanElement>("#btn-label-reset");

  if (!form || !otpForm || !feedback || !submitBtn || !spinner || !btnLabel)
    return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const email = emailInput.value.trim();

    try {
      const response = await fetch("/auth/lost-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Reset link sent to your email address.");
        emailInput.value = "";
        otpForm.classList.remove("hidden");
        otpForm.classList.add("flex");
      } else {
        console.error("Failed to send reset link. Please try again.");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  });
}
