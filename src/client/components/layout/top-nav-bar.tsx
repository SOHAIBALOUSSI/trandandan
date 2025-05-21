function ProfilePicture() {
  const profilePic = (
    <img src="assets/abel-mqa.jpeg" alt="Profile" className="profile-pic" data-link />
  );

  return profilePic;
}

export function TopNavBar() {
  const topNavBar = (
    <nav className="top-nav-bar">
      <div className="left-controls">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          className="search-bar"
          id="search-bar"
          type="search"
          placeholder="Find A Racket Companion"
          aria-label="Search"
        />
      </div>
      <div className="right-controls">
        <div className="notif">
          <i className="fa-regular fa-bell"></i>
        </div>
        <ProfilePicture />
      </div>
    </nav>
  );

  const profilePic = topNavBar.querySelector(".profile-pic");
  if (profilePic) {
    profilePic.onclick = () => {
      window.location.pathname = "profile";
    };
  }

  return topNavBar;
}
