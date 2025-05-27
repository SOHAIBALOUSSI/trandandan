export function TopBar() {
  const topbar = (
    <header className="fixed top-0 left-0 md:pl-[140px] right-0 z-40 h-20 md:h-20 bg-black/50 backdrop-blur-md border-b border-pong-dark-accent/30 px-4 md:pr-8 flex items-center justify-between shadow-md">
      <input
        type="search"
        id="search-bar"
        placeholder="Find A Racket Companion..."
        className="bg-pong-dark-primary/40 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pong-dark-accent w-1/2 max-w-md normal-case ml-16 md:ml-0"
      />
      <div className="flex items-center gap-6">
        <button className="text-xl text-white hover:text-pong-dark-accent">
          <i className="fa-regular fa-bell"></i>
        </button>
        <button className="text-xl text-white hover:text-pong-dark-accent">
          <i className="fa-regular fa-user"></i>
        </button>
      </div>
    </header>
  );

  return topbar;
}
