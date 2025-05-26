import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";

export function Settings() {
  const settingsSection = (
    <section className={`${styles.pageLayoutDark} dark-page-layout`}>
      <NavBar />
      {/* <TopBar /> */}
    </section>
  );
  return settingsSection;
}
