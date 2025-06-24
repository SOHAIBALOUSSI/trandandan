import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";

export function Blocked() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}></main>
      </div>
    </section>
  );
}
