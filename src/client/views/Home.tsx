import { MainHeader } from "@/components/common/MainHeader";
import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import MaleAvatar from "@/assets/male.png";
import FemaleAvatar from "@/assets/female.png";

function HeroSection() {
  const user = getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:items-start text-center w-[90%] max-w-5xl mx-auto mt-6 md:mt-12">
      <div
        id="player-level"
        className="bg-pong-dark-highlight/30 text-white px-8 py-4 rounded-xl shadow-lg w-full md:w-auto transition-transform duration-300 hover:scale-105"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-pong-dark-secondary">
          Grade
        </p>
        <span className="text-lg md:text-xl font-bold">
          {user?.level.toString()}
        </span>
      </div>

      <div
        id="player-sold"
        className="md:order-2 bg-pong-dark-highlight/30 text-white px-8 py-4 rounded-xl shadow-lg w-full md:w-auto transition-transform duration-300 hover:scale-105"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-pong-dark-secondary">
          Sold
        </p>
        <span className="text-lg md:text-xl font-bold">
          {user?.solde.toString()} F
        </span>
      </div>

      <div
        id="hero-welcome"
        className="flex flex-col items-center md:order-1 justify-center gap-3"
      >
        <p className="text-sm text-pong-secondary italic">
          Ranked #4 in BHV Club
        </p>
        <img
          src={user?.gender === "M" ? MaleAvatar : FemaleAvatar}
          alt="profile image"
          className="w-[110px] h-[110px] rounded-full shadow-md mb-2 hover:shadow-xl transition-shadow duration-300"
        />
        <p className="text-base font-medium leading-snug">
          Welcome back,{" "}
          <span className="font-semibold text-pong-secondary">
            {user?.username}
          </span>
          !<br />
          Your paddle is polished. Let’s play.
        </p>
      </div>
    </div>
  );
}

function QuickLink(props: { href: string; title: string; text: string }) {
  const { href, title, text } = props;

  return (
    <div className="py-4 px-6 border border-pong-dark-highlight rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-pong-dark-highlight/10 group">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{text}</p>
      <a
        href={href}
        className="inline-block mt-3 text-pong-accent group-hover:text-pong-secondary transition-colors duration-300"
        data-link
      >
        <i className="fa-solid fa-arrow-right ml-1"></i>
      </a>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="flex flex-col gap-6 mt-10 md:mt-16 w-full max-w-3xl mx-auto px-4">
      <QuickLink
        title="Commence a Duel"
        href="/arena/duel"
        text="Let the house bear witness to your skill"
      />
      <QuickLink
        title="The Grand Tourney"
        href="/arena/tourney"
        text="Join the ranks of contenders in the season’s noble competition"
      />
      <QuickLink
        title="Match Archives"
        href="/chamber"
        text="Browse through past encounters and measure your legacy"
      />
      <QuickLink
        title="Hall of Champions"
        href="/chamber"
        text="Behold the names etched in gold — the finest among us"
      />
    </div>
  );
}

export function Home() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-2rem)] overflow-y-auto">
          <MainHeader isDark={false} title="the club" titleSpan="hall" />
          <HeroSection />
          <QuickLinks />
        </main>
      </div>
    </section>
  );
}
