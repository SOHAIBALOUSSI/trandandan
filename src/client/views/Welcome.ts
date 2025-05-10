export function renderWelcome(container: HTMLElement): void {
  const section = document.createElement("section");
  section.className = "light-page";
  section.innerHTML = `
        <i class="fa-solid fa-table-tennis-paddle-ball"></i>
        <i class="fa-solid fa-table-tennis-paddle-ball"></i>
        <i class="fa-solid fa-table-tennis-paddle-ball"></i>
        <i class="fa-solid fa-table-tennis-paddle-ball"></i>
        <i class="fa-solid fa-table-tennis-paddle-ball"></i>
        <div class="container wlcm-page">
          <img src="assets/bg.jpg" alt="" />
          <div class="signin-action">
            <button class="btn-primary">
              <i class="fa-solid fa-ticket"></i>
              Enter The Club
            </button>
            <p>“Take your first step into the court”</p>
          </div>
          <div class="main-title">
            <h1>welcome to the bhv ping pong club</h1>
            <h3>play like it’s 1901. compete like a champion.</h3>
          </div>
        </div>
	`;
  container.appendChild(section);
}
