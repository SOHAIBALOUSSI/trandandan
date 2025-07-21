import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { Loader } from "@/components/common/Loader";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { fontSizes } from "@/styles/fontSizes";
import { showUserBadge } from "@/utils/show-user-badge";

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

          <div className="absolute z-50 top-100 right-2 md:right-10 w-20 md:w-32 h-20 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-pong-primary/80 to-pong-secondary">
            <img
              src={showUserBadge(user.rank)}
              alt={`${user.username}'s badge`}
              className="bg-cover p-1 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 w-full">
            <div className="order-1 flex flex-col items-center space-y-6 gap-4">
              <MemberCard user={user} showUpdateOptions={true} />

              <div className="w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
                  <a
                    href="/members"
                    data-link
                    className={styles.darkPrimaryBtn}
                  >
                    <i className="fa-solid fa-user-group mr-2"></i>View Friends
                  </a>
                  <a
                    href="/chamber"
                    data-link
                    className={styles.darkPrimaryBtn}
                  >
                    <i className="fa-solid fa-ranking-star mr-2"></i>See Ranking
                  </a>
                  <a
                    href="/security"
                    data-link
                    className={styles.darkPrimaryBtn}
                  >
                    <i className="fa-solid fa-lock mr-2"></i>Enable 2FA
                  </a>
                  <a
                    href="/security"
                    data-link
                    className={styles.darkPrimaryBtn}
                  >
                    <i className="fa-solid fa-gear mr-2"></i>Update Password
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
