import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";

export function Blocked() {
  return (
    <section className={styles.pageLayoutDark} id="blocked-section">
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center gap-8">
          <MainHeader isDark={false} title="blocked" titleSpan="accounts" />
        </main>
      </div>
    </section>
  );
}
