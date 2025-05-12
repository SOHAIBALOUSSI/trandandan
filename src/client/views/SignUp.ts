export function renderSignUp(container: HTMLElement): void {
  const section = document.createElement("section");
  section.className = "light-page";
  section.innerHTML = `
        <div class="container signup-page">
          <img src="./assets/bg.jpg" alt="Background illustration" />
          <div class="header">
            <h1 class="main-heading-dark">join <span>the club</span></h1>
            <h3 class="subtitle">become a member</h3>
            <p class="subtitle">sign your name into club history</p>
          </div>
          <form action="" method="post" class="sign-form">
            <input
              type="text"
              name="username"
              id="username"
              class="input-field"
              placeholder="enter your username"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              class="input-field"
              placeholder="enter your email"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              class="input-field"
              placeholder="enter your password"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              class="input-field"
              placeholder="confirm your password"
              required
            />
            <button class="btn-primary">
              <i class="fa-solid fa-table-tennis-paddle-ball"></i>
              register your racket
            </button>
            <p class="caption">
              by joining, you swear on honor to compete fairly and uphold the
              spirit of ping pong.
            </p>
            <div class="link">
              <p>Already hold a racket? <a href="#">Sign in here.</a></p>
            </div>
          </form>
          <footer>
            Est. in Spirit — Reviving the Golden Age of the Game. © 2025 BHV
            Club
          </footer>
        </div>
	`;
  container.appendChild(section);
}
