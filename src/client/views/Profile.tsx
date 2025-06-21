import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { MemberCard } from "@/components/profile/MemberCard";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import MaleAvatar from "@/assets/male.png";
import FemaleAvatar from "@/assets/female.png";

export function Profile() {
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
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-2rem)] overflow-y-auto">
          <MainHeader isDark={false} title="user" titleSpan="profile" />
          <MemberCard
            name={user?.username}
            email={user?.email}
            sold={user?.solde.toString()}
            grade={user?.level.toString()}
            avatar={user?.gender === "M" ? MaleAvatar : FemaleAvatar}
            rank={user?.rank.toString()}
          />
        </main>
      </div>
    </section>
  );
}
