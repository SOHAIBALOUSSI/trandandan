export function renderWelcome(container: HTMLElement): void {
  const section = document.createElement("section");
  section.className = "light-page";
  section.innerHTML = `
        <div class="container wlcm-page">
          <div class="signin-action">
            <button class="btn-primary">
              <i class="fa-solid fa-ticket"></i>
              Enter The Club
            </button>
            <p>“Take your first step into the court”</p>
          </div>
          <div class="main-title">
            <h1>Welcome to the bhv ping pong club</h1>
            <h3>Play like it’s 1901. Compete like a champion.</h3>
          </div>
          <footer>
            Est. in Spirit — Reviving the Golden Age of the Game. © 2025 BHV
            Club
          </footer>
        </div>
	`;
  container.appendChild(section);
}
