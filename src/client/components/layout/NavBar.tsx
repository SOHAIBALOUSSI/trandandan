export function NavBar() {
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

  const nav = document.createElement("nav");
  nav.className = `
    w-full px-3 py-4 flex flex-col items-stretch gap-4 md:gap-10
    md:w-[110px] md:min-h-screen md:fixed md:top-0 md:left-0
    md:items-center md:py-10 md:px-0
    mt-16 md:mt-4
    bg-gradient-to-b from-pong-dark-secondary via-pong-dark-primary to-black/95
    shadow-2xl border-r-2 border-pong-dark-accent/40
    text-pong-dark-primary z-50
    transition-all duration-300
    md:rounded-tr-3xl md:rounded-br-3xl
  `;

  const toggleBtn = document.createElement("button");
  toggleBtn.className = `
    text-3xl self-end text-pong-dark-accent bg-transparent rounded-lg p-2
    hover:bg-pong-dark-accent/20 transition duration-300 md:hidden
    focus:outline-none focus:ring-2 focus:ring-pong-dark-accent
    mb-2
  `;
  toggleBtn.setAttribute("aria-label", "Toggle navigation");
  toggleBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;

  const ul = document.createElement("ul");
  ul.className = `
    flex-col gap-4 mt-2 md:flex md:mt-0 md:gap-8 md:items-center w-full
    bg-black/90 md:bg-transparent rounded-2xl shadow-lg md:shadow-none
    p-4 md:p-0
    hidden
    transition-all duration-300
    nav-menu
  `;

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
  });

  nav.appendChild(toggleBtn);
  nav.appendChild(ul);

  let menuOpen = false;
  toggleBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      ul.classList.remove("hidden");
      ul.classList.add("flex");
      nav.classList.add("bg-black/95");
      toggleBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    } else {
      ul.classList.add("hidden");
      ul.classList.remove("flex");
      nav.classList.remove("bg-black/95");
      toggleBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    }
  });

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      ul.classList.remove("hidden");
      ul.classList.add("flex");
      toggleBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
      menuOpen = false;
    } else if (!menuOpen) {
      ul.classList.add("hidden");
      ul.classList.remove("flex");
    }
  };
  window.addEventListener("resize", handleResize);
  handleResize();

  return nav;
}
