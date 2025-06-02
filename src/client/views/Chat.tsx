import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";

export function Chat() {
  const chatSection = (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto">
          <MainHeader isDark={false} title="message" titleSpan="center" />
        </main>
      </div>
    </section>
  );

  return chatSection;
}
