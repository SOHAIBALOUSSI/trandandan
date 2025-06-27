export function displayToast(
  message: string,
  type: "success" | "error" | "warning",
  options?: { noProgressBar?: boolean }
) {
  const existingToast = document.getElementById("global-toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.id = "global-toast";

  toast.className = `fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-xl shadow-2xl text-white z-50 flex flex-col items-center min-w-[240px] max-w-sm w-fit backdrop-blur-md border ${
    type === "success"
      ? "bg-green-600/90 border-green-400/40"
      : type === "error"
      ? "bg-red-600/90 border-red-400/40"
      : "bg-yellow-600/90 border-yellow-400/40"
  } animate-toast-slide-down`;

  const msg = document.createElement("span");
  msg.className = "text-sm sm:text-base font-medium text-center";
  msg.textContent = message;
  toast.appendChild(msg);

  const duration = type === "success" ? 2000 : 3000;

  if (!options?.noProgressBar) {
    const progress = document.createElement("div");
    progress.className =
      "h-1 w-full bg-white/20 rounded-b-lg mt-3 overflow-hidden";
    const bar = document.createElement("div");
    bar.className = "h-full bg-white will-change-[width]";
    bar.style.width = "100%";
    bar.style.transition = `width ${duration}ms linear`;
    progress.appendChild(bar);
    toast.appendChild(progress);

    setTimeout(() => {
      bar.style.width = "0%";
    }, 20);
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translate(-50%, -20px)";
    toast.style.transition = "opacity 0.5s, transform 0.5s";
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, duration);
}
