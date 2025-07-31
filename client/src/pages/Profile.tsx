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
import { getUserTitle } from "@/utils/get-user-title";

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
            subtitle="Your identity, matches & achievements in the BHV Club."
          />

          <div className="w-[95%] mx-auto flex flex-col 2xl:flex-row gap-10 items-start">
            <div className="w-full 2xl:w-1/3 2xl:sticky 2xl:top-24 self-start">
              <MemberCard user={user} showUpdateOptions={true} />
            </div>

            <div className="flex-1 flex flex-col gap-8">
              <div
                id="performance-metrics"
                className="bg-gradient-to-br from-[#1f2025] to-[#292b33] p-6 rounded-2xl shadow-xl border border-white/5"
              ></div>

              <MatchHistory user={user} />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
