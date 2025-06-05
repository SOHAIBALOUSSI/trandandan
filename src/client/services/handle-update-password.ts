export function handleUpdatePassword() {
  const form = document.getElementById(
    "update-password-form"
  ) as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPasswordInput = document.getElementById(
      "new-password"
    ) as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const params = { newPassword, confirmPassword };

    try {
      const response = await fetch("/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tempToken")}`,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error("Failed to update password. Please try again.");
      }

      alert("Password updated successfully.");
    } catch (error) {
      console.error(error);
    }
  });
}
