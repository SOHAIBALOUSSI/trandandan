export function NavBar() {
  // === NAV ITEMS ===
  const navItems = [
    { path: "/salon", icon: "fa-house", label: "salon" },
    { path: "/arena", icon: "fa-table-tennis-paddle-ball", label: "arena" },
    { path: "/honor", icon: "fa-ranking-star", label: "honor" },
    { path: "/lounge", icon: "fa-message", label: "lounge" },
    { path: "/members", icon: "fa-user-group", label: "members" },
    { path: "/mechanics", icon: "fa-gear", label: "mechanics" },
    { path: "/exit", icon: "fa-arrow-right-from-bracket", label: "exit" },
  ];

  const currentPath = window.location.pathname;

  // === TOGGLE BUTTON ===
  let toggleBtn = document.getElementById(
    "pong-toggle-btn"
  ) as HTMLButtonElement | null;
  if (!toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.id = "pong-toggle-btn";
    toggleBtn.className = `
      fixed top-4 left-4 z-50 text-3xl text-pong-dark-accent bg-transparent rounded-lg p-2 
      hover:bg-pong-dark-accent/20 transition duration-300 md:hidden
      focus:outline-none focus:ring-2 focus:ring-pong-dark-accent
    `;
    toggleBtn.setAttribute("aria-label", "Toggle navigation");
    toggleBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    document.body.appendChild(toggleBtn);
  }

  // === BACKDROP ===
  let backdrop = document.getElementById(
    "pong-nav-backdrop"
  ) as HTMLDivElement | null;
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "pong-nav-backdrop";
    backdrop.className = `
      fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 opacity-0 pointer-events-none md:hidden
    `;
    document.body.appendChild(backdrop);
  }

  // === NAV CONTAINER ===
  // Remove previous nav if present
  const oldNav = document.getElementById("pong-navbar");
  if (oldNav) oldNav.remove();

  const nav = document.createElement("nav");
  nav.id = "pong-navbar";
  nav.className = `
    fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-pong-dark-secondary via-pong-dark-primary to-black/95 
    text-pong-dark-primary z-50 transform -translate-x-full transition-transform duration-300 ease-in-out
    flex flex-col gap-10 px-6 py-10
    md:translate-x-0 md:flex md:w-[110px] md:min-h-screen 
    md:items-center md:py-10 md:px-0 md:rounded-tr-3xl md:rounded-br-3xl md:shadow-2xl 
    md:border-r-2 md:border-pong-dark-accent/40
  `;

  // === UL NAV ITEMS ===
  const ul = document.createElement("ul");
  ul.className = `flex flex-col gap-6 md:gap-8 md:items-center w-full mt-12 md:mt-0`;

  navItems.forEach(({ path, icon, label }) => {
    const isActive = currentPath === path;
    const li = document.createElement("li");
    li.className = "w-full";

    const a = document.createElement("a");
    a.href = path;
    a.setAttribute("data-link", "true");
    a.className = `
      flex items-center gap-3 font-semibold px-3 py-2 rounded-xl
      transition duration-300
      ${isActive ? "bg-pong-dark-accent/30 shadow-lg" : ""}
      hover:bg-pong-dark-accent/20
      md:flex-col md:gap-2 md:text-sm md:px-0 md:py-0 md:w-full md:bg-transparent
      group
    `;

    a.innerHTML = `
      <i class="fa-solid ${icon} text-xl md:text-2xl transition-transform group-hover:scale-110
        ${
          isActive
            ? "text-pong-dark-accent group-hover:text-pong-dark-accent"
            : "text-white group-hover:text-pong-dark-accent"
        }"></i>
      <span class="${
        isActive
          ? "text-white group-hover:text-pong-dark-accent"
          : "text-pong-dark-accent group-hover:text-pong-dark-accent"
      }">${label}</span>
    `;

    li.appendChild(a);
    ul.appendChild(li);

    a.addEventListener("click", () => {
      if (window.innerWidth < 768) closeMenu();
    });
  });

  nav.appendChild(ul);

  // === MENU LOGIC ===
  let menuOpen = false;

  const openMenu = () => {
    nav.classList.remove("-translate-x-full");
    backdrop.classList.add("opacity-100", "pointer-events-auto");
    menuOpen = true;
    toggleBtn!.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  };

  const closeMenu = () => {
    nav.classList.add("-translate-x-full");
    backdrop.classList.remove("opacity-100", "pointer-events-auto");
    menuOpen = false;
    toggleBtn!.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  };

  toggleBtn.onclick = () => {
    menuOpen ? closeMenu() : openMenu();
  };

  backdrop.onclick = closeMenu;

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove("-translate-x-full");
      backdrop.classList.remove("opacity-100", "pointer-events-auto");
      menuOpen = false;
      toggleBtn!.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    } else if (!menuOpen) {
      nav.classList.add("-translate-x-full");
    }
  };
  window.addEventListener("resize", handleResize);
  handleResize();

  return nav;
}
