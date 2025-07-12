import { styles } from "@/styles/styles";

export function TopBar() {
  setTimeout(() => {
    const badge = document.getElementById("notif-badge") as HTMLSpanElement;
    if (!badge) return;

    function updateBadge(e: CustomEvent) {
      const count = Number(e.detail);
      badge.textContent = count > 0 ? String(count) : "";
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
        >
          {/* <a href="/notifs" data-link> */}
            <i className="fa-regular fa-bell"></i>
            <span
              id="notif-badge"
              className="absolute -top-1 -right-2 bg-pong-dark-primary text-black text-xs rounded-full px-2 py-0.5"
            ></span>
          {/* </a> */}
          <div
            id="notif-container"
            className="absolute bg-pong-dark-primary text-black w-[450px] hidden right-0 shadow-lg rounded-lg p-4 mt-2"
          >
            <h3 className="font-semibold mb-2">Notifications</h3>
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
