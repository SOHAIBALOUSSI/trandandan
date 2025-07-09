import { styles } from "@/styles/styles";
import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { fontSizes } from "@/styles/fontSizes";
import { handlePendingRequests } from "@/handlers/pending-requests";

export function Notifications() {
  setTimeout(() => {
    handlePendingRequests();
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>

          <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto">
            <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3 mb-8">
              <span className="inline-block w-1.5 h-8 bg-pong-highlight rounded-sm"></span>
              Pending Requests
            </h2>
            <p className="text-sm text-white/60 mt-[-1rem] mb-6 pl-6">
              See pending requests
            </p>
            <ul
              id="pending-requests-list"
              className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`}
            >
              <li className="text-white text-center">Loading...</li>
            </ul>
          </div>
        </main>
      </div>
    </section>
  );
}
