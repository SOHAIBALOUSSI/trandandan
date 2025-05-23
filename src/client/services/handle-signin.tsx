export function handleSignIN() {
  const signInForm = document.querySelector<HTMLFormElement>("#signin-form");
  const feedback = document.querySelector<HTMLDivElement>("#signin-feedback");

  console.log(feedback);

  if (!signInForm || !feedback) return;

  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signInForm);
    const loginValue = formData.get("login") as string;
    const password = formData.get("password") as string;

    console.log(loginValue);
    console.log(password);

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValue);
    const payload = isEmail
      ? { email: loginValue, password }
      : { username: loginValue, password };

    const showFeedback = (message: string) => {
      if (!feedback) return;
      feedback.textContent = message;
    };

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 200) {
        localStorage.setItem("auth", "true");
        result.accessToken &&
          localStorage.setItem("accessToken", result.accessToken);
        result.refreshToken &&
          localStorage.setItem("refreshToken", result.refreshToken);
        setTimeout(() => {
          history.pushState(null, "", "/home");
          window.dispatchEvent(new PopStateEvent("popstate"));
        }, 1200);
      } else if (response.status === 206) {
        result.tempToken && localStorage.setItem("tempToken", result.tempToken);
        showFeedback("Two-factor authentication required.");
        feedback.classList.remove("pong-error");
        feedback.classList.add("pong-warning");
        history.pushState(null, "", "/2fa/verify-login");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else if (response.status === 400 || response.status === 404) {
        showFeedback("Invalid credentials. Try again, champ.");
      } else if (response.status === 500) {
        showFeedback("Server's catching its breath. Try again later.");
        console.error(result.details || "No details provided.");
      } else {
        showFeedback("Something’s off. Ping us if it keeps happening.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      showFeedback("Network issue. Your legacy will have to wait.");
    }
  });
}
