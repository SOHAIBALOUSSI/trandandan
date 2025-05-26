import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";

export function Game() {
  const gameSection = (
    <section className={`${styles.pageLayoutDark} dark-page-layout`}>
      <NavBar />
      {/* <TopBar /> */}
    </section>
  );
  return gameSection;
}
