export function initGameThemeToggle() {
  const toggleBtn = document.getElementById("game-theme-toggle");
  const container = document.getElementById("game-screen");

  if (!toggleBtn || !container) return;

  // Set initial icon based on theme
  const setIcon = () => {
    const isDark = container.dataset.theme === "dark";
    toggleBtn.innerHTML = isDark
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
  };

  setIcon();

  // Remove previous listener if any
  toggleBtn.onclick = null;

  toggleBtn.addEventListener("click", () => {
    console.log("clicked");
    const isDark = container.dataset.theme === "dark";
    container.dataset.theme = isDark ? "light" : "dark";
    setIcon();

    // Optionally, update canvas background for light theme
    const canvas = container.querySelector("canvas");
    if (canvas) {
      (canvas as HTMLCanvasElement).style.background =
        container.dataset.theme === "dark"
          ? "rgba(0,0,0,0.8)"
          : "rgba(255,255,255,0.8)";
    }
  });
}
	