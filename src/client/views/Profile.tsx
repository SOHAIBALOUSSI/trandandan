import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { MemberCard } from "@/components/profile/MemberCard";
import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";
import { handleUpdateInfos } from "@/handlers/handle-update-infos";
import { CTA } from "@/components/common/Cta";
import MaleAvatar from "@/assets/male.png";
import FemaleAvatar from "@/assets/female.png";

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
          {/* <MainHeader isDark={false} title="club member" titleSpan="ledger" /> */}
          <MemberCard
            name={user?.username}
            email={user?.email}
            sold={user?.solde.toString()}
            grade={user?.level.toString()}
            avatar={user?.gender === "M" ? MaleAvatar : FemaleAvatar}
            rank={user?.rank.toString()}
          />
          <button id="edit-btn" className={`${styles.btnOneStyles} my-2`}>
            Edit
          </button>
          <form id="edit-form" className="hidden flex-col gap-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              className="normal-case placeholder:capitalize p-2 text-pong-dark-primary rounded-md bg-pong-secondary/10 border border-pong-dark-secondary focus:outline-none focus:ring-2 focus:ring-pong-accent transition-all"
            />
            <CTA btnIcon="fa-edit" btnLabel="submit" />
          </form>
        </main>
      </div>
    </section>
  );
}
