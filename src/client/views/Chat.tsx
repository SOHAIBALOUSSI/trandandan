import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";

export function Chat() {
  const chatSection = (
    <section className={`${styles.pageLayoutDark} dark-page-layout`}>
      <NavBar />
      {/* <TopBar /> */}
    </section>
  );
  return chatSection;
}
