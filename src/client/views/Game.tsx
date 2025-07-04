import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";

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
    let current = 0;
    const total = 3;

    const slider = document.getElementById(
      "game-slider-inner"
    ) as HTMLDivElement;
    const indicators = document.querySelectorAll(
      ".game-slider-indicator"
    ) as NodeListOf<HTMLSpanElement>;
    const leftBtn = document.getElementById(
      "game-slider-left"
    ) as HTMLButtonElement;
    const rightBtn = document.getElementById(
      "game-slider-right"
    ) as HTMLButtonElement;
    if (!slider || !indicators || !leftBtn || !rightBtn) return;

    const updateSlider = () => {
      slider.style.transform = `translateX(-${current * 100}%)`;
      leftBtn.toggleAttribute("disabled", current === 0);
      rightBtn.toggleAttribute("disabled", current === gameModes.length - 1);
      indicators.forEach((dot, i) => {
        dot.style.backgroundColor =
          i === current ? "#fff" : "rgba(255,255,255,0.3)";
      });

      const playBtn = document.getElementById(
        `play-btn-${current}`
      ) as HTMLButtonElement;
      if (!playBtn) return;

      playBtn.addEventListener("click", () => {
        history.pushState({}, "", gameModes[current].href);
        window.dispatchEvent(new PopStateEvent("popstate"));
        console.log(gameModes[current].href);
      });
    };

    leftBtn.addEventListener("click", () => {
      if (current > 0) {
        current--;
        updateSlider();
      }
    });

    rightBtn.addEventListener("click", () => {
      if (current < total - 1) {
        current++;
        updateSlider();
      }
    });

    updateSlider();
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

          <div className="hidden md:block w-full">
            <div
              id="game-slider"
              className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl"
            >
              <div
                id="game-slider-inner"
                className="transition-transform duration-700 ease-in-out flex w-full"
              >
                {gameModes.map((mode, index) => (
                  <div
                    id={`game-mode-${index}`}
                    key={index}
                    className="min-w-full h-[32rem] flex justify-center items-center text-center px-4 sm:px-8 bg-cover bg-center bg-no-repeat"
                  >
                    <div className="flex flex-col items-center gap-5 px-8 py-6 sm:px-12 sm:py-10 rounded-3xl border border-pong-accent/20 shadow-xl bg-gradient-to-br from-black/60 via-pong-dark-custom/30 to-pong-accent/10 backdrop-blur-md transition-transform hover:scale-[1.03] duration-300 ease-in-out max-w-md lg:max-w-2xl  w-full">
                      <h2
                        className={`${fontSizes.smallTitleFontSize} font-extrabold text-white drop-shadow-sm tracking-tight`}
                      >
                        {mode.title}
                      </h2>
                      <p
                        className={`${fontSizes.bodyFontSize} text-white/90 leading-relaxed drop-shadow-sm`}
                      >
                        {mode.text}
                      </p>
                      <button
                        className="mt-3 group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pong-accent hover:bg-pong-dark-accent shadow-lg transition-all duration-300 ease-in-out active:scale-95 focus:outline-none"
                        aria-label="Start Game"
                        id={`play-btn-${index}`}
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
              <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                <button
                  id="game-slider-left"
                  className="bg-pong-accent p-2 rounded-full text-white hover:bg-pong-secondary transition disabled:opacity-40"
                  aria-label="Previous mode"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                <button
                  id="game-slider-right"
                  className="bg-pong-accent p-2 rounded-full text-white hover:bg-pong-secondary transition disabled:opacity-40"
                  aria-label="Next mode"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                {[0, 1, 2].map((idx) => (
                  <span
                    key={idx}
                    className="game-slider-indicator w-2 h-2 rounded-full bg-white/30 transition"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden w-full flex flex-col items-center justify-center min-h-[40vh]">
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
