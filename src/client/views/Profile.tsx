import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { RecentMatches } from "@/components/profile/RecentMatches";
import { BadgesAndTrophies } from "@/components/profile/BadgesAndTrophies";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { handleUpdateInfos } from "@/handlers/handle-update-infos";

export function Profile() {
  setTimeout(() => {
    handleUpdateInfos();
  }, 0);

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
        <main className={styles.pageContent}>
          <MemberCard
            name={user?.username}
            email={user?.email}
            sold={user?.solde.toString()}
            grade={user?.level.toString()}
            avatar={user?.avatar_url}
            rank={user?.rank.toString()}
          />
          <RecentMatches />
          <BadgesAndTrophies />
        </main>
      </div>
    </section>
  );
}
