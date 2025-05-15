export function renderHome(container: HTMLElement): void {
  const section = document.createElement("section");
  section.className = "dark-page";
  section.innerHTML = `
        <nav class="nav-bar">
          <button class="nav-toggle" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars"></i>
          </button>
          <ul class="nav-menu">
            <li class="nav-item active">
              <a href="#"
                ><i class="fa-solid fa-house"></i><span>salon</span></a
              >
            </li>
            <li class="nav-item">
              <a href="#"
                ><i class="fa-solid fa-table-tennis-paddle-ball"></i
                ><span>arena</span></a
              >
            </li>
            <li class="nav-item">
              <a href="#"
                ><i class="fa-solid fa-ranking-star"></i><span>honor</span></a
              >
            </li>
            <li class="nav-item">
              <a href="#"
                ><i class="fa-solid fa-message"></i><span>lounge</span></a
              >
            </li>
            <li class="nav-item">
              <a href="#"
                ><i class="fa-solid fa-user-group"></i><span>members</span></a
              >
            </li>
            <li class="nav-item">
              <a href="#"
                ><i class="fa-solid fa-gear"></i><span>mechanics</span></a
              >
            </li>
            <li class="nav-item">
              <a href="#"
                ><i class="fa-solid fa-arrow-right-from-bracket"></i
                ><span>exit</span></a
              >
            </li>
          </ul>
        </nav>
        <nav class="top-nav-bar">
          <div class="left-controls">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder="Find a Racket Companion"
              aria-label="Search"
            />
          </div>
          <div class="right-controls">
            <div class="notif">
              <i class="fa-regular fa-bell"></i>
            </div>
            <img
              src="./assets/abel-mqa.jpeg"
              alt="Profile"
              class="profile-pic"
            />
          </div>
        </nav>
        <div class="container home-page">
          <div class="header">
            <h1 class="main-heading-light">the club <span>hall</span></h1>
          </div>
          <div class="home-welcome">
            <div class="level-info">
              <p>level</p>
              <span>1.6</span>
            </div>
            <div class="welcome-section">
              <p class="rank">Ranked # <span>4</span> in BHV Club</p>
              <img src="assets/abel-mqa.jpeg" alt="Profile Picture" />
              <p>
                welcome back <span>Adil</span> !<br />your paddle is polished.
                let's play.
              </p>
            </div>
            <div class="sold-info">
              <p>sold</p>
              <span>5 <span>F</span></span>
            </div>
          </div>
          <div class="quick-links">
            <div class="quick-link">
              <h2>Commence a Duel</h2>
              <p>Let the house bear witness to your skill</p>
              <button><i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <div class="quick-link">
              <h2>The Grand Tourney</h2>
              <p>
                Join the ranks of contenders in the season’s noble competition
              </p>
              <button><i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <div class="quick-link">
              <h2>Match Archives</h2>
              <p>Browse through past encounters and measure your legacy</p>
              <button><i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <div class="quick-link">
              <h2>Hall of Champions</h2>
              <p>Behold the names etched in gold — the finest among us</p>
              <button><i class="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
  `;
  container.appendChild(section);
}
