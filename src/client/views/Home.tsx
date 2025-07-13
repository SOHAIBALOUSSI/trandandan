import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { Hero } from "@/components/home/Hero";
import { QuickStatsCards } from "@/components/home/QuickStatsCards";
import { RecentActivityFeed } from "@/components/home/RecentActivityFeed";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";

export function Home() {
  const user = getCurrentUser();
  if (!user) {
    return (
      <section className={styles.pageLayoutDark}>
        <NavBar />
        <div className="w-full relative">
          <TopBar />
          <Loader text="Preparing your club profile..." />
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
          <QuickStatsCards user={user} />
          <RecentActivityFeed />
          <LeaderboardPreview user={user} />
        </main>
      </div>
    </section>
  );
}
