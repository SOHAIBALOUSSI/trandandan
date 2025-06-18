import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { QuickStatsCards } from "@/components/home/QuickStatsCards";
import { ActionButtons } from "@/components/home/ActionButtons";
import { RecentActivityFeed } from "@/components/home/RecentActivityFeed";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { styles } from "@/styles/styles";
import { Hero } from "@/components/home/Hero";
import { QuickLinks } from "@/components/home/QuickLinks";

export function Home() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="px-20 pt-20 md:pt-26 h-[calc(100vh-2rem)] overflow-y-auto">
          <Hero />
          <QuickStatsCards />
          <QuickLinks />
          {/* <ActionButtons /> */}
          <RecentActivityFeed />
          <LeaderboardPreview />
        </main>
      </div>
    </section>
  );
}
