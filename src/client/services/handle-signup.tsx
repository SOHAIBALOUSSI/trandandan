export function handleSignUp() {
  const signupForm = document.querySelector("#signup-form");
  const feedback = document.querySelector<HTMLDivElement>("#signup-feedback");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e: any) => {
      e.preventDefault();

      const username = (document.querySelector("#username") as HTMLInputElement)
        .value;
      const email = (document.querySelector("#email") as HTMLInputElement)
        .value;
      const password = (document.querySelector("#password") as HTMLInputElement)
        .value;
      const confirmPassword = (
        document.querySelector("#confirm-password") as HTMLInputElement
      ).value;

      const showFeedback = (message: string) => {
        if (!feedback) return;
        feedback.textContent = message;
      };

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

        if (result.statusCode === 201) {
          console.log("Registered successfully:", result);
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);
          setTimeout(() => {
            history.pushState(null, "", "signin");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }, 1200);
        } else if (result.statusCode === 400 || result.statusCode === 401) {
          showFeedback(result.message);
        } else if (result.statusCode === 500) {
          showFeedback("Server error. Try again later.");
          console.error(result.details || "No additional error details.");
        } else {
          showFeedback(result.message || "Unexpected error occurred.");
        }
      } catch (err) {
        console.error("Error registering:", err);
        showFeedback("Server error. Please try again later.");
      }
    });
  }
}
