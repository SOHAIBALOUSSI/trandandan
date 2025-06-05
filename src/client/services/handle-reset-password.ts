export function handleResetPassword() {
  const form = document.getElementById(
    "reset-password-form"
  ) as HTMLFormElement;
  const otpForm = document.getElementById("otp-form") as HTMLFormElement;
  if (!form) return;

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

      if (!response.ok) {
        throw new Error("Failed to send reset link. Please try again.");
      }

      alert("Reset link sent to your email address.");
      emailInput.value = "";
      otpForm.classList.remove("hidden");
      otpForm.classList.add("flex");
    } catch (error) {
      console.error(error);
    }
  });
}
