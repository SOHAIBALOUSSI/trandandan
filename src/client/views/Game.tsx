import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";

export function Game() {
  const gameModes = [
    {
      title: "1 vs 1 — Lounge Duel",
      text: "Challenge a friend beside you in an elegant local match. Pure skill, no lag — just legacy.",
      bg: "url('/assets/local-duel.jpg')",
    },
    {
      title: "Tournament — Club Cup",
      text: "Gather champions in-house. Compete in a local bracket to earn eternal bragging rights in the lounge.",
      bg: "url('/assets/tournament-cup.jpg')",
    },
    {
      title: "1 vs 1 — Remote Arena",
      text: "Face a rival across the network. Ping-pong from across the globe, prestige from your own paddle.",
      bg: "url('/assets/remote-battle.jpg')",
    },
  ];

  setTimeout(() => {}, 0);

  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className={styles.pageContent}>
          <div id="game-slider" className="relative w-full max-w-md mx-auto">
            <div
              id="game-slider-inner"
              className="transition-transform duration-700 ease-in-out flex flex-col h-full"
              style={{ transform: "translateY(0%)" }}
            >
              {gameModes.map((mode, index) => (
                <div
                  key={index}
                  className="h-full flex flex-col justify-center items-center text-center p-6 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: mode.bg }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {mode.title}
                  </h2>
                  <p className="text-lg text-white/80">{mode.text}</p>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-4 z-10">
              <button className="bg-pong-accent p-2 rounded-full text-white hover:bg-pong-secondary transition">
                <i className="fa-solid fa-chevron-up"></i>
              </button>
              <button className="bg-pong-accent p-2 rounded-full text-white hover:bg-pong-secondary transition">
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
