export function handleGoogleSignin() {
  const btn = document.getElementById("google-signin-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.location.href = "/auth/google";
  });
}

export function handle42Signin() {
  const btn = document.getElementById("ft-signin-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    location.href = "/auth/42";
  });
}
