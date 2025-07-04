import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { TitleDark } from "@/components/common/TitleDark";
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
