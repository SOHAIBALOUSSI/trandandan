export function TopBar() {
  return (
    <header className="fixed top-0 left-0 md:pl-[142px] right-0 z-40 h-16 md:h-20 bg-black/80 backdrop-blur-md border-b border-pong-dark-accent/30 px-4 md:pr-8 flex items-center justify-between shadow-md">
      <input
        type="search"
        id="search-bar"
        placeholder="Find A Racket Companion..."
        className="bg-pong-dark-primary/40 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pong-dark-accent w-1/2 max-w-md normal-case"
      />
      <div className="flex items-center gap-6">
        <button className="text-xl text-white hover:text-pong-dark-accent">
          <i className="fa-regular fa-bell"></i>
        </button>
        <button className="text-xl text-white hover:text-pong-dark-accent">
          <i className="fa-regular fa-user"></i>
        </button>
      </div>
    </header>
  );
}

// function ProfilePicture() {
//   const imgUrl = "assets/abel-mqa.jpeg";
//   const profilePic = (
//     <img
//       src={imgUrl}
//       alt="profile picture"
// 	  id="profile-picture"
//       className="w-9 h-9 rounded-full cursor-pointer outline outline-4 outline-transparent hover:outline-pong-dark-highlight transition-all duration-300"
//       data-link
//     />
//   );

//   return profilePic;
// }

// export function TopBar() {
//   const topNavBar = (
//     <nav className="sticky top-0 z-50 w-full flex items-center justify-between gap-4 px-4 py-3 text-pong-dark-primary bg-transparent backdrop-blur-md">
//       {/* Left Controls: Search */}
//       <div className="flex flex-1 items-center gap-2 border border-pong-dark-highlight px-3 py-2 rounded-md focus-within:outline-none focus-within:border-pong-dark-primary focus-within:shadow-[0_0_0_2px_rgba(255,255,255,0.05)] transition-all">
//         <i className="fa-solid fa-magnifying-glass text-[#aebabf77] group-focus-within:text-pong-dark-primary transition-colors duration-300" />
//         <input
//           id="search-bar"
//           type="search"
//           placeholder="Find A Racket Companion"
//           aria-label="Search"
//           className="w-full bg-transparent border-none text-pong-dark-primary placeholder:text-[#aebabf77] placeholder:font-normal focus:outline-none font-semibold"
//         />
//       </div>

//       {/* Right Controls */}
//       <div className="flex items-center gap-4">
//         <div className="w-9 h-9 border border-pong-dark-highlight rounded-full flex items-center justify-center cursor-pointer relative">
//           <i className="fa-regular fa-bell text-pong-dark-primary relative">
//             <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-pong-dark-highlight text-white text-[8px] font-bold flex items-center justify-center">
//               0
//             </span>
//           </i>
//         </div>
//         <ProfilePicture />
//       </div>
//     </nav>
//   );

//   const profilePic = topNavBar.querySelector("#profile-picture") as HTMLImageElement;
//   if (profilePic) {
//     profilePic.onclick = () => {
//       history.pushState(null, "", "/profile");
//       window.dispatchEvent(new PopStateEvent("popstate"));
//     };
//   }

//   return topNavBar;
// }
