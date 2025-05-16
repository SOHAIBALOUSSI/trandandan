export function Welcome() {
  return (
    <section className="light-page">
      <div className="my-container wlcm-page">
        <div className="signin-action">
          <button className="btn-primary">
            <i className="fa-solid fa-ticket"></i>
            Enter The Club
          </button>
          <p className="signin-action-quote">
            “Take your first step into the court”
          </p>
        </div>
        <div className="main-title">
          <h1 className="main-title-header">
            Welcome to the bhv ping pong club
          </h1>
          <h3 className="main-title-subheader">
            Play like it’s 1901. Compete like a champion.
          </h3>
        </div>
        <footer>
          Est. in Spirit — Reviving the Golden Age of the Game. © 2025 BHV Club
        </footer>
      </div>
    </section>
  );
}

// export function renderWelcome(container: HTMLElement): void {
//   const section = document.createElement("section");
//   section.className = "light-page";
//   section.innerHTML = `
//         <div class="container wlcm-page">
//           <div class="signin-action">
//             <button class="btn-primary">
//               <i class="fa-solid fa-ticket"></i>
//               Enter The Club
//             </button>
//             <p>“Take your first step into the court”</p>
//           </div>
//           <div class="main-title">
//             <h1>Welcome to the bhv ping pong club</h1>
//             <h3>Play like it’s 1901. Compete like a champion.</h3>
//           </div>
//           <footer>
//             Est. in Spirit — Reviving the Golden Age of the Game. © 2025 BHV
//             Club
//           </footer>
//         </div>
// 	`;
//   container.appendChild(section);
// }
