import { styles } from "@/styles/styles";

export function TopBar() {
  const topbar = (
    <header className={styles.navBarStyle}>
      <input
        type="search"
        id="search-bar"
        placeholder="Find A Racket Companion..."
        className={styles.searchBarStyle}
      />
      <div className="flex items-center gap-6">
        <button className="text-xl text-white hover:text-pong-dark-accent">
          <i className="fa-regular fa-bell"></i>
        </button>
        <button className="text-xl text-white hover:text-pong-dark-accent">
          <a href="/profile" data-link>
            <i className="fa-regular fa-user"></i>
          </a>
        </button>
      </div>
    </header>
  );

  return topbar;
}
