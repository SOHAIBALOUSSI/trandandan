import { MainHeader } from "@/components/common/MainHeader";
import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { Hero } from "@/components/home/Hero";
import { QuickLinks } from "@/components/home/QuickLinks";
import { styles } from "@/styles/styles";

export function Home() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-2rem)] overflow-y-auto">
          <MainHeader isDark={false} title="the club" titleSpan="hall" />
          <Hero />
          <QuickLinks />
        </main>
      </div>
    </section>
  );
}
