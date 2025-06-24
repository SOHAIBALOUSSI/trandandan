export function mark2faAsEnabled(mode: "app" | "email") {
  const statusLabel = document.getElementById(`${mode}-status`);
  const primaryBtn = document.getElementById(
    mode === "app" ? "primary-app" : "primary-email"
  );
  const toggleBtn = document.getElementById(
    mode === "app" ? "toggle-app" : "toggle-email"
  );

  if (statusLabel) {
    statusLabel.textContent = "Enabled";
    statusLabel.className =
      "ml-2 px-2 py-1 text-xs font-bold rounded-full bg-green-200 text-green-700";
  }

  if (toggleBtn) toggleBtn.classList.add("hidden");
  if (primaryBtn) primaryBtn.classList.remove("hidden");
}
