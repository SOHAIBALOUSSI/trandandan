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
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="px-6 md:px-20 pt-20 md:pt-24 h-[calc(100vh-2rem)] overflow-y-auto">
          <SecondaryHeader
            title="Member Profile"
            subtitle="Review your identity, matches, and achievements."
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="order-1 flex flex-col items-center space-y-6">
              <MemberCard user={user} />
            </div>

            <div className="order-2 space-y-6 flex flex-col gap-4">
              <RecentMatches />
              <BadgesAndTrophies />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
