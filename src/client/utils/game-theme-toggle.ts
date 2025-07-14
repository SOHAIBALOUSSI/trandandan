export function initGameThemeToggle() {
  const toggleBtn = document.getElementById("game-theme-toggle");
  const container = document.getElementById("game-screen");

  if (!toggleBtn || !container) return;

  const setIcon = () => {
    const isDark = container.dataset.theme === "dark";
    toggleBtn.innerHTML = isDark
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
  };

  setIcon();

  toggleBtn.onclick = null;

  toggleBtn.addEventListener("click", () => {
    const isDark = container.dataset.theme === "dark";
    container.dataset.theme = isDark ? "light" : "dark";
    setIcon();

    const canvas = container.querySelector("canvas");
    if (canvas) {
      (canvas as HTMLCanvasElement).style.background =
        container.dataset.theme === "dark"
          ? "rgba(0,0,0,0.8)"
          : "rgba(255,255,255,0.8)";
    }
  });
}
