export function handleGoogleSignin() {
  const btn = document.getElementById("google-signin-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.location.href = "/auth/google";
  });
}
