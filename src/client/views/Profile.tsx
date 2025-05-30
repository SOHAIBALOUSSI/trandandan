import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { MemberCard } from "@/components/layout/MemberCard";
import { styles } from "@/styles/styles";

export function Profile() {
  const profileSection = (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="md:ml-[110px] md:w-[calc(100vw-110px)] relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto">
          <MainHeader isDark={false} title="user" titleSpan="profile" />
		  <MemberCard name="Adil Belmqadem" sold="5" grade="1.6" avatar="/assets/abel-mqa.jpeg" rank="4" />
        </main>
      </div>
    </section>
  );
  return profileSection;
}
