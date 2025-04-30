export function renderHome(container: HTMLElement): void {
  const section = document.createElement("section");
  section.className = "p-8 text-center";
  section.innerHTML = `
    <h1 class="text-4xl font-bold mb-4">Welcome to Pong</h1>
    <nav class="space-x-4">
      <a href="#game" class="text-blue-500 hover:underline">Game</a>
      <a href="#profile" class="text-blue-500 hover:underline">Profile</a>
      <a href="#chat" class="text-blue-500 hover:underline">Chat</a>
    </nav>
  `;
  container.appendChild(section);
}
