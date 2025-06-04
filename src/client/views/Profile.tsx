import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { MemberCard } from "@/components/layout/MemberCard";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import MaleAvatar from "@/assets/male.png";
import FemaleAvatar from "@/assets/female.png";

export function Profile() {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const profileSection = (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto">
          <MainHeader isDark={false} title="user" titleSpan="profile" />
          <MemberCard
            name={user?.username}
            sold={user?.solde.toString()}
            grade="1.6"
            avatar={user?.gender === "M" ? MaleAvatar : FemaleAvatar}
            rank="4"
          />
        </main>
      </div>
    </section>
  );
  return profileSection;
}
