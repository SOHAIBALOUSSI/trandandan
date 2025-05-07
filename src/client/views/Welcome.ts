export function renderWelcome(container: HTMLElement): void {
  const section = document.createElement("section");
  section.className = "light-page";
  section.innerHTML = `
		<i class="fa-solid fa-table-tennis-paddle-ball"></i>
		<i class="fa-solid fa-table-tennis-paddle-ball"></i>
		<i class="fa-solid fa-table-tennis-paddle-ball"></i>
		<i class="fa-solid fa-table-tennis-paddle-ball"></i>
		<i class="fa-solid fa-table-tennis-paddle-ball"></i>
		<div class="container wlcm-sec">
			<button class="btn-primary">
				<i class="fa-solid fa-ticket"></i>
				Enter The Club
			</button>
			<p>“Take your first step into the court”</p>
			<h1>Welcome to the bhv ping pong club</h1>
			<h3>Play like it’s 1901. Compete like a champion.</h3>	
		</div>
	`;
  container.appendChild(section);
}
