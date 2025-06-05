export function handle42Signin() {
  const btn = document.getElementById("ft-signin-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    location.href = "/auth/42";
  });
}
