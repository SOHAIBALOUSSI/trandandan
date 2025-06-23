import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";

function GameMode(props: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[200px] bg-pong-highlight/20 rounded-lg m-4 cursor-pointer">
      <h2 className="text-2xl font-bold text-white mb-4">{props.title}</h2>
      <p className="text-lg text-gray-300">{props.text}</p>
    </div>
  );
}

export function Game() {
  return (
    <section className={styles.pageLayoutDark}>
      <NavBar />
      <div className="w-full relative">
        <TopBar />
        <main className="p-4 pt-20 md:pt-24 h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] max-w-5xl m-auto">
            <GameMode title="1 vs 1 local" text="text here" />
            <GameMode title="tournament local" text="text here" />
            <GameMode title="1 vs 1 remote" text="text here" />
          </div>
        </main>
      </div>
    </section>
  );
}
