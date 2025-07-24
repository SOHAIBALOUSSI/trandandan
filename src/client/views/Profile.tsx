import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { fontSizes } from "@/styles/fontSizes";
import { showUserBadge } from "@/utils/show-user-badge";
import { getUserTitle } from "@/utils/get-user-title";
import { MatchHistory } from "@/components/profile/MatchHistory";

export function Profile() {
  const user = getCurrentUser();
  if (!user) {
    return <Loader text="Preparing your club profile..." />;
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 w-full max-w-5xl">
            <div className="lg:col-span-2 flex flex-col items-center">
              <MemberCard user={user} showUpdateOptions={true} />
            </div>

            <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
              <div className="p-4 bg-pong-dark-custom rounded-xl shadow-md text-center">
                <h3
                  className={`${fontSizes.smallTitleFontSize} pb-2 font-bold text-yellow-400 `}
                >
                  Wins
                </h3>
                <p className="text-2xl md:text-3xl">{user.matches_won || 0}</p>
              </div>
              <div className="p-4 bg-pong-dark-custom rounded-xl shadow-md text-center">
                <h3
                  className={`${fontSizes.smallTitleFontSize} pb-2 font-bold text-yellow-400 `}
                >
                  Losses
                </h3>
                <p className="text-2xl md:text-3xl">{user.matches_lost || 0}</p>
              </div>
              <div className="p-4 bg-pong-dark-custom rounded-xl shadow-md text-center col-span-2">
                <h3
                  className={`${fontSizes.smallTitleFontSize} pb-2 font-bold text-yellow-400 `}
                >
                  Current Title
                </h3>
                <p className="text-2xl md:text-3xl">
                  {getUserTitle(user.rank) || "Challenger"}
                </p>
              </div>
            </div>
          </div>

          <MatchHistory user={user} />
        </main>
      </div>
    </section>
  );
}
