import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";

export function Dashboard() {
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
          <SecondaryHeader
            title="The Honor Board"
            subtitle="Your Club Dashboard — track progress, stats & rivalries"
          />
        </main>
      </div>
    </section>
  );
}
