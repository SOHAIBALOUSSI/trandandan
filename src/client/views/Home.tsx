import { MainHeader } from "@/components/common/MainHeader";
import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { QuickLink } from "@/components/common/QuickLink";
import { styles } from "@/styles/styles";

function heroSection() {
  const heroContainer = (
    <div className="">
      <img src="" alt="" />
    </div>
  );

  return heroContainer;
}

function QuickLinks() {
  const linksContainer = (
    <div className="">
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
        href="/honor"
        text="Browse through past encounters and measure your legacy"
      />
      <QuickLink
        title="Hall of Champions"
        href="/honor"
        text="Behold the names etched in gold — the finest among us"
      />
    </div>
  );

  return linksContainer;
}

export function Home() {
  const homeSection = (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="md:ml-[110px] md:w-[calc(100vw-110px)] relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto">
          <MainHeader isDark={false} title="the club" titleSpan="hall" />
          {/* <heroSection />
          <QuickLinks /> */}
        </main>
      </div>
    </section>
  );

  return homeSection;
}

function fetchUserData() {}
