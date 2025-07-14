import { styles } from "@/styles/styles";
import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";

export function Lounge() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <SecondaryHeader
            title="Lounge Conversations"
            subtitle="Chat with fellow club champions"
          />
        </main>
      </div>
    </section>
  );
}
