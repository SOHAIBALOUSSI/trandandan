import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { TitleDark } from "@/components/common/TitleDark";
import { styles } from "@/styles/styles";

export function Chat() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto"></main>
      </div>
    </section>
  );
}
