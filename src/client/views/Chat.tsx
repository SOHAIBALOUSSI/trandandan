import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import FemaleAvatar from "@/assets/female.png";

export function Chat() {
  const friend = {
    id: 2,
    username: "sopu",
    avatar_url: FemaleAvatar,
    level: "13.37",
    rank: "Gold",
  };

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

          <div className="relative flex flex-col gap-6 w-full max-w-3xl bg-pong-dark-custom md:p-10 h-[60vh] md:h-[70vh] bg-pong-dark-bg/90 backdrop-blur-lg border border-pong-secondary/30 rounded-xl shadow-inner p-4">
            <div className="sticky top-0 z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-md border border-white/10 shadow-md">
              <img
                src={friend.avatar_url}
                alt="Friend avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-pong-accent shadow"
              />
              <div>
                <h3 className="text-lg font-bold text-pong-accent">
                  {friend.username}
                </h3>
                <div className="flex gap-2 mt-1">
                  <span className="bg-pong-highlight/20 text-pong-highlight px-3 py-1 rounded-full text-xs font-semibold">
                    {friend.level}
                  </span>
                  <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {friend.rank}
                  </span>
                </div>
              </div>
              <div className="justify-self-end flex-1 text-right">
                <button className={styles.darkPrimaryBtn}>
                  <i className="fa-solid fa-table-tennis-paddle-ball"></i>
                </button>
              </div>
            </div>

            <div
              className="flex-1 overflow-y-auto space-y-6 pr-1 scroll-smooth"
              id="chat-messages"
            >
              <div className="flex flex-col items-start">
                <span className="bg-pong-dark-secondary/90 text-black px-4 py-2 rounded-lg shadow-sm max-w-[70%]">
                  Wch abro
                </span>
                <span className="text-xs text-pong-highlight ml-2 mt-1">
                  You • 10:01 AM
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="bg-pong-secondary/90 text-black px-4 py-2 rounded-lg shadow-sm max-w-[70%]">
                  fen akhy hani
                </span>
                <span className="text-xs text-pong-highlight mr-2 mt-1">
                  Friend • 10:02 AM
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="bg-pong-dark-secondary/90 text-black px-4 py-2 rounded-lg shadow-sm max-w-[70%]">
                  doz t9sser
                </span>
                <span className="text-xs text-pong-highlight ml-2 mt-1">
                  You • 10:03 AM
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="bg-pong-secondary/90 text-black px-4 py-2 rounded-lg shadow-sm max-w-[70%]">
                  sir 3la molana
                </span>
                <span className="text-xs text-pong-highlight mr-2 mt-1">
                  Friend • 10:02 AM
                </span>
              </div>
            </div>

            <form
              className={`flex items-center gap-2 mt-4 px-2 ${fontSizes.smallTextFontSize}`}
              id="chat-input-form"
            >
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 rounded-lg px-4 py-2 bg-white/10 text-white focus:outline-none placeholder:text-white/50 caret-pong-accent"
              />
              <button
                type="submit"
                className="bg-pong-accent hover:bg-pong-dark-accent text-white font-bold px-5 py-2 rounded-lg transition capitalize"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
