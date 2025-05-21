export function LeftNavBar() {
  const navItems = [
    { path: "/home", icon: "fa-house", label: "salon" },
    { path: "/game", icon: "fa-table-tennis-paddle-ball", label: "arena" },
    { path: "/dashboard", icon: "fa-ranking-star", label: "honor" },
    { path: "/chat", icon: "fa-message", label: "lounge" },
    { path: "/friends", icon: "fa-user-group", label: "members" },
    { path: "/settings", icon: "fa-gear", label: "mechanics" },
    { path: "/welcome", icon: "fa-arrow-right-from-bracket", label: "exit" },
  ];

  const currentPath = window.location.pathname;

  const linksHtml = navItems
    .map((item) => {
      const isActive = item.path === currentPath ? "active" : "";
      return `
		  <li class="nav-item ${isActive}">
			<a href="${item.path}" class="nav-item-link" data-link>
			  <i class="fa-solid ${item.icon}"></i>
			  <span>${item.label}</span>
			</a>
		  </li>
		`;
    })
    .join("");

  const navHtml = `
	  <nav class="nav-bar">
		<button class="nav-toggle" aria-label="Toggle navigation">
		  <i class="fa-solid fa-bars"></i>
		</button>
		<ul class="nav-menu">
		  ${linksHtml}
		</ul>
	  </nav>
	`;

  const template = document.createElement("template");
  template.innerHTML = navHtml.trim();
  const leftNavBar = template.content.firstElementChild as HTMLElement;

  const toggle = leftNavBar.querySelector(".nav-toggle");
  const menu = leftNavBar.querySelector(".nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  return leftNavBar;
}
