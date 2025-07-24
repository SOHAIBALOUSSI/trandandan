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

export function Profile() {
  const user = getCurrentUser();
  if (!user) {
    return <Loader text="Preparing your club profile..." />;
  }

  return (
    <section className={`${styles.pageLayoutDark} relative`}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />

        <main className={styles.pageContent}>
          <SecondaryHeader
            title="Member Profile"
            subtitle="Review your identity, matches, and achievements."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
            <div className="lg:col-span-2 flex flex-col items-center">
              <MemberCard user={user} showUpdateOptions={true} />
            </div>

            <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
              <div className="relative col-span-2 w-full h-48 rounded-xl shadow-xl overflow-hidden flex items-center justify-center">
                <img
                  src={showUserBadge(user.rank)}
                  alt={`${user.username}'s badge`}
                  className="w-40 h-40 object-cover drop-shadow-md rounded-xl"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  {user.rank || 0}
                </div>
              </div>

              <div className="p-4 bg-pong-dark-custom rounded-xl shadow-md text-center transition-transform hover:scale-105">
                <h3
                  className={`${fontSizes.smallTitleFontSize} pb-2 font-bold text-yellow-400`}
                >
                  Wins
                </h3>
                <p className="text-3xl font-semibold text-white">
                  {user.matches_won || 0}
                </p>
              </div>

              <div className="p-4 bg-pong-dark-custom rounded-xl shadow-md text-center transition-transform hover:scale-105">
                <h3
                  className={`${fontSizes.smallTitleFontSize} pb-2 font-bold text-yellow-400`}
                >
                  Losses
                </h3>
                <p className="text-3xl font-semibold text-white">
                  {user.matches_lost || 0}
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
