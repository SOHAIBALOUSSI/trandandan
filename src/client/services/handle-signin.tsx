export function handleSignIN() {
  const signInForm = document.querySelector<HTMLFormElement>("#signin-form");
  if (!signInForm) return;

  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signInForm);
    const loginValue = formData.get("login") as string;
    const password = formData.get("password") as string;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValue);
    const payload = isEmail
      ? { email: loginValue, password }
      : { username: loginValue, password };

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("auth", "true");

        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
        }
        if (result.refreshToken) {
          localStorage.setItem("refreshToken", result.refreshToken);
        }

        history.pushState(null, "", "/home");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        alert(result.error || "Login failed.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Server error. Try again later.");
    }
  });
}
