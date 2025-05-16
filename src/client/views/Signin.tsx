export function Signin() {
  return (
    <section className="light-page">
      <div className="my-container signin-page">
        <div className="header">
          <h1 className="main-heading-dark">
            welcome back, <span className="my-underline">champion</span>
          </h1>
          <h3 className="subtitle-h">step into the club</h3>
          <p className="subtitle-p">
            enter your credentials to continue your legacy.
          </p>
        </div>
        <div className="signin-form">
          <form action="" method="post" className="sign-form">
            <input
              type="text"
              name="login"
              className="input-field"
              id="login"
              placeholder="username or email"
              required
            />
            <input
              type="password"
              name="password"
              className="input-field"
              id="password"
              placeholder="password"
              required
            />
            <button className="btn-primary btn-bottom">
              <i className="fa-solid fa-couch"></i>
              enter the lounge
            </button>
            <a href="#" className="lost-pass">
              lost your paddle?
            </a>
            <div className="link">
              <p>
                new here? <a href="#">join the club and make history.</a>
              </p>
            </div>
            <div className="line">
              <i className="fa-solid fa-table-tennis-paddle-ball"></i>
            </div>
          </form>
          <div className="remote-signin">
            <button className="btn-primary">
              <i className="fa-solid fa-couch"></i>
              enter with google
            </button>
            <button className="btn-primary">
              <i className="fa-solid fa-couch"></i>
              enter with 42
            </button>
          </div>
        </div>
        <footer>
          Est. in Spirit — Reviving the Golden Age of the Game. © 2025 BHV Club
        </footer>
      </div>
    </section>
  );
}

// export function renderSignIn(container: HTMLElement): void {
//   const section = document.createElement("section");
//   section.className = "light-page";
//   section.innerHTML = `
//         <div class="container signin-page">
//           <div class="header">
//             <h1 class="main-heading-dark">
//               welcome back, <span>champion</span>
//             </h1>
//             <h3 class="subtitle">step into the club</h3>
//             <p class="subtitle">
//               enter your credentials to continue your legacy.
//             </p>
//           </div>
//           <div class="signin-form">
//             <form action="" method="post" class="sign-form">
//               <input
//                 type="text"
//                 name="login"
//                 class="input-field"
//                 id="login"
//                 placeholder="username or email"
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 class="input-field"
//                 id="password"
//                 placeholder="password"
//                 required
//               />
//               <button class="btn-primary">
//                 <i class="fa-solid fa-couch"></i>
//                 enter the lounge
//               </button>
//               <a href="#" class="lost-pass">lost your paddle?</a>
//               <div class="link">
//                 <p>new here? <a href="#">join the club and make history.</a></p>
//               </div>
//               <div class="line">
//                 <i class="fa-solid fa-table-tennis-paddle-ball"></i>
//               </div>
//             </form>
//             <div class="remote-signin">
//               <button class="btn-primary">
//                 <i class="fa-solid fa-couch"></i>
//                 enter with google
//               </button>
//               <button class="btn-primary">
//                 <i class="fa-solid fa-couch"></i>
//                 enter with 42
//               </button>
//             </div>
//           </div>
//           <footer>
//             Est. in Spirit — Reviving the Golden Age of the Game. © 2025 BHV
//             Club
//           </footer>
//         </div>
// 	`;
//   container.appendChild(section);
// }
