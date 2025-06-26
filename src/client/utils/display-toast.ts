export function displayToast(message: string, type: "success" | "error" | "warning") {
  const existingToast = document.getElementById("global-toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.id = "global-toast";
  toast.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50 animate-fadeInDown flex flex-col items-center min-w-[220px] ${
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-yellow-500"
  }`;

  const msg = document.createElement("span");
  msg.textContent = message;
  toast.appendChild(msg);

  const progress = document.createElement("div");
  progress.className =
    "h-1 w-full bg-white/40 rounded-b-lg mt-2 overflow-hidden";
  const bar = document.createElement("div");
  bar.className = "h-full bg-white transition-all duration-[3000ms]";
  bar.style.width = "100%";
  progress.appendChild(bar);
  toast.appendChild(progress);

  document.body.appendChild(toast);

  setTimeout(() => {
    bar.style.width = "0%";
  }, 10);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s";
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
}
