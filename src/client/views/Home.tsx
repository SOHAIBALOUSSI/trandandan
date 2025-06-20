import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { Hero } from "@/components/home/Hero";
import { QuickStatsCards } from "@/components/home/QuickStatsCards";
import { QuickLinks } from "@/components/home/QuickLinks";
import { RecentActivityFeed } from "@/components/home/RecentActivityFeed";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { styles } from "@/styles/styles";

export function Home() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={`${styles.pageContent} gap-6`}>
          <Hero />
          <QuickStatsCards />
          <QuickLinks />
          <RecentActivityFeed />
          <LeaderboardPreview />
        </main>
      </div>
    </section>
  );
}
