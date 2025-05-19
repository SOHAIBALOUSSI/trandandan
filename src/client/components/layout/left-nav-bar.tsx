export function LeftNavBar() {
  const leftNavBar = (
    <nav className="nav-bar">
      <button className="nav-toggle" aria-label="Toggle navigation">
        <i className="fa-solid fa-bars"></i>
      </button>
      <ul className="nav-menu">
        <li className="nav-item active">
          <a href="#home" className="nav-item-link">
            <i className="fa-solid fa-house"></i>
            <span>salon</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#game" className="nav-item-link">
            <i className="fa-solid fa-table-tennis-paddle-ball"></i>
            <span>arena</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#dashboard" className="nav-item-link">
            <i className="fa-solid fa-ranking-star"></i>
            <span>honor</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#chat" className="nav-item-link">
            <i className="fa-solid fa-message"></i>
            <span>lounge</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#friends" className="nav-item-link">
            <i className="fa-solid fa-user-group"></i>
            <span>members</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#settings" className="nav-item-link">
            <i className="fa-solid fa-gear"></i>
            <span>mechanics</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-item-link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>exit</span>
          </a>
        </li>
      </ul>
    </nav>
  );

  const toggle = leftNavBar.querySelector(".nav-toggle");
  const menu = leftNavBar.querySelector(".nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  return leftNavBar;
}
