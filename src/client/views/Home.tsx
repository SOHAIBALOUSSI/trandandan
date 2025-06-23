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
          <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto flex items-center justify-center">
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
        <main className={`${styles.pageContent} gap-6`}>
          <Hero user={user} />
          <QuickStatsCards />
          <QuickLinks />
          <RecentActivityFeed />
          <LeaderboardPreview />
        </main>
      </div>
    </section>
  );
}
