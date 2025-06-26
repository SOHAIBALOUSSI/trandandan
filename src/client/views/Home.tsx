import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { Hero } from "@/components/home/Hero";
import { QuickStatsCards } from "@/components/home/QuickStatsCards";
import { QuickLinks } from "@/components/home/QuickLinks";
import { RecentActivityFeed } from "@/components/home/RecentActivityFeed";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";

export function Home() {
  const user = getCurrentUser();
  if (!user) {
    return (
      <section className={styles.pageLayoutDark}>
        <NavBar />
        <div className="w-full relative">
          <TopBar />
          <main className="h-[100vh] flex items-center justify-center">
            <p className="text-white">Loading...</p>
          </main>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <Hero user={user} />
          <QuickStatsCards />
          {/* <QuickLinks /> */}
          <RecentActivityFeed />
          <LeaderboardPreview user={user} />
        </main>
      </div>
    </section>
  );
}
