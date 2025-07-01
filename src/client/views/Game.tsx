import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";

export function Game() {
  const gameModes = [
    {
      title: "1 vs 1 — Lounge Duel",
      text: "Challenge a friend beside you in an elegant local match. Pure skill, no lag — just legacy.",
      bg: "../assets/local-duel-bg.png",
    },
    {
      title: "Tournament — Club Cup",
      text: "Gather champions in-house. Compete in a local bracket to earn eternal bragging rights in the lounge.",
      bg: "../assets/tournament-cup-bg.png",
    },
    {
      title: "1 vs 1 — Remote Arena",
      text: "Face a rival across the network. Ping-pong from across the globe, prestige from your own paddle.",
      bg: "../assets/remote-battle-bg.png",
    },
  ];

  setTimeout(() => {
    let current = 0;

    const sliderInner = document.getElementById(
      "game-slider-inner"
    ) as HTMLDivElement;
    const leftBtn = document.getElementById(
      "game-slider-left"
    ) as HTMLButtonElement;
    const rightBtn = document.getElementById(
      "game-slider-right"
    ) as HTMLButtonElement;
    const leftBtnTwo = document.getElementById(
      "game-slider-left-two"
    ) as HTMLButtonElement;
    const rightBtnTwo = document.getElementById(
      "game-slider-right-two"
    ) as HTMLButtonElement;

    if (!sliderInner || !leftBtn || !rightBtn || !leftBtnTwo || !rightBtnTwo)
      return;

    function updateSlider() {
      sliderInner.style.transform = `translateX(-${current * 100}%)`;
      leftBtn.toggleAttribute("disabled", current === 0);
      rightBtn.toggleAttribute("disabled", current === gameModes.length - 1);
      leftBtnTwo.toggleAttribute("disabled", current === 0);
      rightBtnTwo.toggleAttribute("disabled", current === gameModes.length - 1);
    }

    leftBtn.onclick = () => {
      if (current > 0) {
        current--;
        updateSlider();
      }
    };

    rightBtn.onclick = () => {
      if (current < gameModes.length - 1) {
        current++;
        updateSlider();
      }
    };

    leftBtnTwo.onclick = () => {
      if (current > 0) {
        current--;
        updateSlider();
      }
    };

    rightBtnTwo.onclick = () => {
      if (current < gameModes.length - 1) {
        current++;
        updateSlider();
      }
    };

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

          <div
            id="game-slider"
            className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl"
          >
            <div
              id="game-slider-inner"
              className="transition-transform duration-700 ease-in-out flex w-full"
              style={{ minHeight: "28rem" }}
            >
              {gameModes.map((mode, index) => (
                <div
                  id={`game-mode-${index}`}
                  key={index}
                  className="min-w-full h-[28rem] flex justify-center items-center text-center px-2 sm:px-6 bg-cover bg-center bg-no-repeat"
                >
                  <div className="backdrop-blur-md bg-black/60 p-4 sm:p-8 rounded-2xl shadow-lg max-w-md w-full mx-auto cursor-pointer hover:scale-105 transition-all duration-300 border border-pong-accent/30">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow">
                      {mode.title}
                    </h2>
                    <p className="text-base sm:text-lg text-white/90 drop-shadow leading-relaxed">
                      {mode.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Arrows */}
            <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-4 gap-2 z-10">
              <button
                id="game-slider-left"
                className="bg-pong-accent p-2 rounded-full text-white hover:bg-pong-secondary transition disabled:opacity-40"
                aria-label="Previous mode"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            </div>
            <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-4 gap-2 z-10">
              <button
                id="game-slider-right"
                className="bg-pong-accent p-2 rounded-full text-white hover:bg-pong-secondary transition disabled:opacity-40"
                aria-label="Next mode"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            {/* Mobile Arrows */}
            <div className="sm:hidden flex justify-center gap-6 mt-4">
              <button
                id="game-slider-left-two"
                className="bg-pong-accent p-2 rounded-full text-white hover:bg-pong-secondary transition disabled:opacity-40"
                aria-label="Previous mode"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                id="game-slider-right-two"
                className="bg-pong-accent p-2 rounded-full text-white hover:bg-pong-secondary transition disabled:opacity-40"
                aria-label="Next mode"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
