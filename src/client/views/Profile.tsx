import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { RecentMatches } from "@/components/profile/RecentMatches";
import { BadgesAndTrophies } from "@/components/profile/BadgesAndTrophies";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";

export function Profile() {
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
            title="Member Profile"
            subtitle="Review your identity, matches, and achievements."
          />

          <div className="grid grid-cols-1 gap-8 w-full">
            <div className="order-1 flex flex-col items-center space-y-6 gap-4">
              <MemberCard user={user} showUpdateOptions={true} />
            </div>

            <div className="order-2 space-y-6 flex flex-col items-center gap-4 w-full max-w-5xl mx-auto">
              <RecentMatches />
              <BadgesAndTrophies />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
