import { styles } from "@/styles/styles";

export function TopBar() {
  return (
    <header className={styles.navBarStyle}>
      <input
        type="search"
        id="search-bar"
        placeholder="Find A Racket Companion..."
        className={styles.searchBarStyle}
      />
      <div className="flex items-center gap-8">
        <button className="text-xl text-pong-dark-primary hover:text-pong-dark-accent">
          <i className="fa-regular fa-bell"></i>
        </button>
        <button className="text-xl text-pong-dark-primary hover:text-pong-dark-accent">
          <a href="my_profile" data-link>
            <i className="fa-regular fa-user"></i>
          </a>
        </button>
      </div>
    </header>
  );
}
