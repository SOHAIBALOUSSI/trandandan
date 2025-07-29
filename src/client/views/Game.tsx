import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { navigateTo } from "@/utils/navigate-to-link";

export function Game() {
  const gameModes = [
    {
      title: "1 vs 1 — Lounge Duel",
      text: "Challenge a friend beside you in an elegant local match. Pure skill, no lag — just legacy.",
      href: "/duel",
    },
    {
      title: "Tournament — Club Cup",
      text: "Gather champions in-house. Compete in a local bracket to earn eternal bragging rights in the lounge.",
      href: "/tournament",
    },
    {
      title: "1 vs 1 — Remote Arena",
      text: "Face a rival across the network. Ping-pong from across the globe, prestige from your own paddle.",
      href: "/remote",
    },
  ];

  setTimeout(() => {
    const playBtn = document.querySelectorAll(".game-mode-btn");
    playBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        navigateTo(gameModes[index].href);
      });
    });
  }, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <SecondaryHeader
            title="Choose Your Game Mode"
            subtitle="Pick your playstyle and step into the arena of champions."
          />

          <div className="hidden lg:grid w-full max-w-6xl mx-auto grid-cols-3 rounded-2xl overflow-hidden h-full min-h-[520px]">
            {gameModes.map((mode, index) => (
              <div
                key={index}
                id={`game-mode-${index}`}
                className="flex flex-col items-center justify-center text-center px-6 py-10 bg-gradient-to-br from-black/60 via-pong-dark-custom/30 to-pong-accent/10 border-x border-pong-dark-highlight/30 first:border-l-0 last:border-r-0 hover:scale-[1.02] transition-transform duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex flex-col items-center justify-between gap-5 px-8 py-6 sm:px-12 sm:py-10 rounded-3xl shadow-xl bg-gradient-to-br from-black/60 via-pong-dark-custom/30 to-pong-accent/10 backdrop-blur-sm w-full h-full">
                  <h2
                    className={`${fontSizes.smallTitleFontSize} font-extrabold text-white drop-shadow-sm tracking-tight`}
                  >
                    {mode.title}
                  </h2>
                  <p
                    className={`${fontSizes.bodyFontSize} text-white/90 leading-relaxed mt-4 mb-6`}
                  >
                    {mode.text}
                  </p>
                  <button
                    className="game-mode-btn group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pong-accent hover:bg-pong-dark-accent shadow-lg transition-all duration-300 ease-in-out active:scale-95 focus:outline-none"
                    aria-label="Start Game"
                  >
                    <i
                      className={`${fontSizes.bodyFontSize} fa-solid fa-play text-white ml-[1px] group-hover:animate-ping-once`}
                    />
                    <span className="absolute -bottom-9 text-xs text-white/80 bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      Play Now
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:hidden w-full flex flex-col items-center justify-center min-h-[40vh]">
            <div className="bg-pong-dark-custom/80 border border-pong-accent/30 rounded-2xl shadow-lg px-6 py-10 max-w-sm mx-auto text-center">
              <i className="fa-solid fa-mobile-screen text-3xl text-pong-accent mb-4"></i>
              <h2
                className={`${fontSizes.smallTitleFontSize} font-bold text-white mb-2`}
              >
                Not Available on Mobile
              </h2>
              <p
                className={`text-pong-dark-secondary ${fontSizes.bodyFontSize}`}
              >
                Game modes are only available on desktop or tablet devices.
                <br />
                Please use a larger screen to play.
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
