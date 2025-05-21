export function handleSignUp() {
  const signupForm = document.querySelector("#signup-form");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e: any) => {
      e.preventDefault();

      const username =
        (document.querySelector("#username") as HTMLInputElement)?.value || "";
      const email =
        (document.querySelector("#email") as HTMLInputElement)?.value || "";
      const password =
        (document.querySelector("#password") as HTMLInputElement)?.value || "";
      const confirmPassword =
        (document.querySelector("#confirm-password") as HTMLInputElement)
          ?.value || "";

      try {
        const response = await fetch("/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Registered successfully:", result);
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);
          location.pathname = "signin";
        } else {
          alert(result.error || "Registration failed.");
        }
      } catch (err) {
        console.error("Error registering:", err);
        alert("Server error. Try again later.");
      }
    });
  }
}
