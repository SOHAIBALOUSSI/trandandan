import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { fontSizes } from "@/styles/fontSizes";
import { MatchHistory } from "@/components/profile/MatchHistory";
import { showUserBadge } from "@/utils/show-user-badge";
import { displayPerformanceMetrics } from "@/utils/display-metrics";

export function Profile() {
  const user = getCurrentUser();
  if (!user) {
    return <Loader text="Preparing your club profile..." />;
  }

  setTimeout(() => {
    displayPerformanceMetrics(user);
  }, 0);

  return (
    <section className={`${styles.pageLayoutDark} relative`}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />

        <main className={styles.pageContent + " !gap-10"}>
          <SecondaryHeader
            title="Member Profile"
            subtitle="Review your identity, matches, and achievements."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
            <div className="lg:col-span-2">
              <MemberCard user={user} showUpdateOptions={true} />
            </div>

            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="relative col-span-2 w-1/2 lg:w-full rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={showUserBadge(user.rank)}
                  alt={`${user.username}'s badge`}
                  className="object-cover drop-shadow-md rounded-xl"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  {user.rank || 0}
                </div>
              </div>
            </div>
          </div>

          <div id="performance-metrics" class="w-full max-w-5xl mx-auto"></div>

          <MatchHistory user={user} />
        </main>
      </div>
    </section>
  );
}
