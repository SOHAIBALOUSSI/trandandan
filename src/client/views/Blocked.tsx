import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { BlockedList } from "@/components/settings/BlockedList";
import { hydrateBlocked } from "@/handlers/hydrate-blocked";

export function Blocked() {
  setTimeout(() => {
    hydrateBlocked();
  }, 0);
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <SecondaryHeader
            title="Silenced Opponents"
            subtitle="Players you’ve muted in the club lounge."
          />

          <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto">
            <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3 mb-8">
              <span className="inline-block w-1.5 h-8 bg-pong-accent rounded-sm"></span>
              Muted Members
            </h2>
            <p className="text-sm text-white/60 mt-[-1rem] mb-6 pl-6">
              You won’t hear from these players in chat or matches.
            </p>
            <BlockedList />
          </div>
        </main>
      </div>
    </section>
  );
}
