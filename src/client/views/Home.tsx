export function Home() {
  const section = (
    <section className="dark-page">
      <nav className="nav-bar">
        <button className="nav-toggle" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars"></i>
        </button>
        <ul className="nav-menu">
          <li className="nav-item active">
            <a href="#" className="nav-item-link">
              <i className="fa-solid fa-house"></i>
              <span>salon</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-item-link">
              <i className="fa-solid fa-table-tennis-paddle-ball"></i>
              <span>arena</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-item-link">
              <i className="fa-solid fa-ranking-star"></i>
              <span>honor</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-item-link">
              <i className="fa-solid fa-message"></i>
              <span>lounge</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-item-link">
              <i className="fa-solid fa-user-group"></i>
              <span>members</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-item-link">
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
      <nav className="top-nav-bar">
        <div className="left-controls">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="search-bar"
            id="search-bar"
            type="search"
            placeholder="Find a Racket Companion"
            aria-label="Search"
          />
        </div>
        <div className="right-controls">
          <div className="notif">
            <i className="fa-regular fa-bell"></i>
          </div>
          <img
            src="assets/abel-mqa.jpeg"
            alt="Profile"
            className="profile-pic"
          />
        </div>
      </nav>
      <div className="my-container home-page">
        <div className="header">
          <h1 className="main-heading-light">
            the club <span className="my-underline">hall</span>
          </h1>
        </div>
        <div className="home-welcome">
          <div className="level-info">
            <p>level</p>
            <span>1.6</span>
          </div>
          <div className="welcome-section">
            <p className="rank-p">
              Ranked # <span>4</span> in BHV Club
            </p>
            <img
              src="assets/abel-mqa.jpeg"
              alt="Profile Picture"
              className="profile-picture"
            />
            <p>
              welcome back <span>Adil</span> !<br />
              your paddle is polished. let's play.
            </p>
          </div>
          <div className="sold-info">
            <p>sold</p>
            <span>
              5 <span>F</span>
            </span>
          </div>
        </div>
        <div className="quick-links">
          <div className="quick-link">
            <h2 className="quick-link-h">Commence a Duel</h2>
            <p className="quick-link-p">
              Let the house bear witness to your skill
            </p>
            <button className="quick-link-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="quick-link">
            <h2 className="quick-link-h">The Grand Tourney</h2>
            <p className="quick-link-p">
              Join the ranks of contenders in the season’s noble competition
            </p>
            <button className="quick-link-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="quick-link">
            <h2 className="quick-link-h">Match Archives</h2>
            <p className="quick-link-p">
              Browse through past encounters and measure your legacy
            </p>
            <button className="quick-link-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="quick-link">
            <h2 className="quick-link-h">Hall of Champions</h2>
            <p className="quick-link-p">
              Behold the names etched in gold — the finest among us
            </p>
            <button className="quick-link-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const toggle = section.querySelector(".nav-toggle");
  const menu = section.querySelector(".nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  return section;
}

// export function renderHome(container: HTMLElement): void {
//   const section = document.createElement("section");
//   section.className = "dark-page";
//   section.innerHTML = `
//         <nav class="nav-bar">
//           <button class="nav-toggle" aria-label="Toggle navigation">
//             <i class="fa-solid fa-bars"></i>
//           </button>
//           <ul class="nav-menu">
//             <li class="nav-item active">
//               <a href="#"
//                 ><i class="fa-solid fa-house"></i><span>salon</span></a
//               >
//             </li>
//             <li class="nav-item">
//               <a href="#"
//                 ><i class="fa-solid fa-table-tennis-paddle-ball"></i
//                 ><span>arena</span></a
//               >
//             </li>
//             <li class="nav-item">
//               <a href="#"
//                 ><i class="fa-solid fa-ranking-star"></i><span>honor</span></a
//               >
//             </li>
//             <li class="nav-item">
//               <a href="#"
//                 ><i class="fa-solid fa-message"></i><span>lounge</span></a
//               >
//             </li>
//             <li class="nav-item">
//               <a href="#"
//                 ><i class="fa-solid fa-user-group"></i><span>members</span></a
//               >
//             </li>
//             <li class="nav-item">
//               <a href="#"
//                 ><i class="fa-solid fa-gear"></i><span>mechanics</span></a
//               >
//             </li>
//             <li class="nav-item">
//               <a href="#"
//                 ><i class="fa-solid fa-arrow-right-from-bracket"></i
//                 ><span>exit</span></a
//               >
//             </li>
//           </ul>
//         </nav>
//         <nav class="top-nav-bar">
//           <div class="left-controls">
//             <i class="fa-solid fa-magnifying-glass"></i>
//             <input
//               type="search"
//               placeholder="Find a Racket Companion"
//               aria-label="Search"
//             />
//           </div>
//           <div class="right-controls">
//             <div class="notif">
//               <i class="fa-regular fa-bell"></i>
//             </div>
//             <img
//               src="assets/abel-mqa.jpeg"
//               alt="Profile"
//               class="profile-pic"
//             />
//           </div>
//         </nav>
//         <div class="container home-page">
//           <div class="header">
//             <h1 class="main-heading-light">the club <span>hall</span></h1>
//           </div>
//           <div class="home-welcome">
//             <div class="level-info">
//               <p>level</p>
//               <span>1.6</span>
//             </div>
//             <div class="welcome-section">
//               <p class="rank">Ranked # <span>4</span> in BHV Club</p>
//               <img src="assets/abel-mqa.jpeg" alt="Profile Picture" />
//               <p>
//                 welcome back <span>Adil</span> !<br />your paddle is polished.
//                 let's play.
//               </p>
//             </div>
//             <div class="sold-info">
//               <p>sold</p>
//               <span>5 <span>F</span></span>
//             </div>
//           </div>
//           <div class="quick-links">
//             <div class="quick-link">
//               <h2>Commence a Duel</h2>
//               <p>Let the house bear witness to your skill</p>
//               <button><i class="fa-solid fa-arrow-right"></i></button>
//             </div>
//             <div class="quick-link">
//               <h2>The Grand Tourney</h2>
//               <p>
//                 Join the ranks of contenders in the season’s noble competition
//               </p>
//               <button><i class="fa-solid fa-arrow-right"></i></button>
//             </div>
//             <div class="quick-link">
//               <h2>Match Archives</h2>
//               <p>Browse through past encounters and measure your legacy</p>
//               <button><i class="fa-solid fa-arrow-right"></i></button>
//             </div>
//             <div class="quick-link">
//               <h2>Hall of Champions</h2>
//               <p>Behold the names etched in gold — the finest among us</p>
//               <button><i class="fa-solid fa-arrow-right"></i></button>
//             </div>
//           </div>
//         </div>
//   `;
//   container.appendChild(section);

//   const toggle = document.querySelector(".nav-toggle") as HTMLElement | null;
//   const menu = document.querySelector(".nav-menu") as HTMLElement | null;

//   if (toggle && menu) {
//     toggle.addEventListener("click", () => {
//       menu.classList.toggle("show");
//     });
//   }
// }
