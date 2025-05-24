import { LeftNavBar } from "@/components/layout/left-nav-bar";
import { TopNavBar } from "@/components/layout/top-nav-bar";
import { styles } from "@/styles/styles";

function Header() {
  const header = (
    <div className="header">
      <h1 className="main-heading-light">
        the club <span className="my-underline">hall</span>
      </h1>
    </div>
  );

  return header;
}

function Welcome() {
  const welcome = (
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
  );

  return welcome;
}

function QuickLinks() {
  const quickLinks = (
    <div className="quick-links">
      <div className="quick-link">
        <h2 className="quick-link-h">Commence a Duel</h2>
        <p className="quick-link-p">Let the house bear witness to your skill</p>
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
  );

  return quickLinks;
}

function HomePage() {
  const homePage = (
    <div className="my-container home-page">
      <Header />
      <Welcome />
      <QuickLinks />
    </div>
  );

  return homePage;
}

export function Home() {
  const homeSection = (
    <section className={`${styles.pageLayoutDark} dark-page-layout`}>
      <LeftNavBar />
      <TopNavBar />
      <HomePage />
    </section>
  );

  return homeSection;
}
