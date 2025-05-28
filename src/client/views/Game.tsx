import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MainHeader } from "@/components/common/MainHeader";
import { styles } from "@/styles/styles";

function GameMode(props: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 my-8 cursor-pointer">
      <h2 className="text-2xl font-bold text-white mb-4">{props.title}</h2>
      <p className="text-lg text-gray-300">{props.text}</p>
    </div>
  );
}

export function Game() {
  const gameSection = (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="md:ml-[110px] md:w-[calc(100vw-110px)] relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-4rem)] overflow-y-auto">
          <MainHeader isDark={false} title="arena" titleSpan="zone" />
          <GameMode title="1 vs 1 local" text="text here" />
          <GameMode title="tournament local" text="text here" />
          <GameMode title="1 vs 1 remote" text="text here" />
        </main>
      </div>
    </section>
  );

  return gameSection;
}
