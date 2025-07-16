import { styles } from "@/styles/styles";
import { clearNotificationCounter } from "@/handlers/notifications";

export function TopBar() {
  setTimeout(() => {
    const badge = document.getElementById("notif-badge") as HTMLSpanElement;
    if (!badge) return;

    function updateBadge(e: CustomEvent) {
      const count = Number(e.detail);
      badge.textContent = count > 0 ? String(count) : "0";
      if (count > 0) {
        badge.classList.remove("text-black", "bg-pong-dark-primary");
        badge.classList.add("text-white", "bg-pong-accent");
      } else {
        badge.classList.add("text-black", "bg-pong-dark-primary");
        badge.classList.remove("text-white", "bg-pong-accent");
      }
    }

    window.addEventListener("notification-count", updateBadge as EventListener);

    const seen = JSON.parse(sessionStorage.getItem("seenNotifs") || "[]");
    badge.textContent = seen.length > 0 ? String(seen.length) : "0";
    if (seen.length > 0) {
      badge.classList.remove("text-black", "bg-pong-dark-primary");
      badge.classList.add("text-white", "bg-pong-accent");
    } else {
      badge.classList.add("text-black", "bg-pong-dark-primary");
      badge.classList.remove("text-white", "bg-pong-accent");
    }

    const notifContainer = document.getElementById("notif-container");
    const btn = document.getElementById("bell-btn") as HTMLButtonElement;
    if (!notifContainer || !btn) return;

    btn.addEventListener("click", () => {
      notifContainer.classList.toggle("hidden");
    });

    clearNotificationCounter();
  }, 0);

  return (
    <header className={styles.navBarStyle}>
      <input
        type="search"
        id="search-bar"
        placeholder="Find A Racket Companion..."
        className={styles.searchBarStyle}
      />

      <div className="flex items-center gap-8">
        <button
          id="bell-btn"
          className="relative text-xl text-pong-dark-primary hover:text-pong-dark-accent"
          aria-label="Show notifications"
        >
          <i className="fa-regular fa-bell"></i>
          <span
            id="notif-badge"
            className="absolute -top-1 -right-2 bg-pong-dark-primary text-black text-xs rounded-full px-2 py-0.5 transition-all duration-300"
          ></span>
          <div
            id="notif-container"
            className="animate-fadeInUp absolute bg-pong-dark-bg text-pong-dark-primary w-[300px] md:w-[450px] max-h-[480px] hidden right-0 shadow-2xl rounded-xl p-4 mt-2 z-50 border border-pong-dark-primary"
          >
            <h3 className="font-semibold mb-3 text-lg text-pong-accent flex items-center gap-2">
              <i className="fa-regular fa-bell"></i> Club Updates
            </h3>
            <ul
              id="notif-list"
              className="list-none p-0 m-0 space-y-2 max-h-[220px] overflow-y-auto"
            ></ul>
          </div>
        </button>
        <button className="text-xl text-pong-dark-primary hover:text-pong-dark-accent">
          <a href="/my_profile" data-link>
            <i className="fa-regular fa-user"></i>
          </a>
        </button>
      </div>
    </header>
  );
}
