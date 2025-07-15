import { UserProfile } from "types/types";
import { getUserRank } from "@/utils/get-user-rank";
import { navigateTo } from "@/utils/navigate-to-link";

export function ChatBlock(friend: UserProfile) {
  return (
    <div className="relative flex flex-col w-full max-w-5xl h-full max-h-[100vh] min-h-[600px] md:rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e1f24] to-[#252830] backdrop-blur-xl border border-pong-accent/20 shadow-[0_4px_30px_rgba(0,0,0,0.35)] transition-all duration-500">
      <div className="sticky top-0 z-10 flex items-center gap-4 bg-gradient-to-br from-[#2b2e34]/80 to-[#363a43]/60 backdrop-blur-md p-4 md:p-6 border-b border-pong-secondary/40">
        <a
          href={`/members/${friend.id}`}
          data-link
          className="w-12 h-12 md:w-14 md:h-14 border-2 border-pong-accent rounded-full overflow-hidden shadow cursor-pointer"
        >
          <img
            src={friend.avatar_url}
            alt={`${friend.username}'s avatar`}
            className="w-full h-full object-cover"
          />
        </a>
        <div className="flex flex-col justify-center">
          <h3 className="w-fit text-base md:text-xl font-semibold text-pong-dark-accent tracking-wide normal-case cursor-pointer">
            <a href={`members/${friend.id}`} data-link>
              {friend.username}
            </a>
          </h3>
          <div className="flex gap-2 mt-1">
            <span className="bg-pong-highlight/20 text-pong-highlight px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Level {friend.level}
            </span>
            <span className="bg-yellow-400/10 text-yellow-300 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs font-semibold shadow-sm">
              {getUserRank(friend.level)}
            </span>
          </div>
        </div>
        <div className="ml-auto">
          <button
            className="bg-pong-dark-secondary text-white hover:bg-pong-accent/90 px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-md transition"
            title="Challenge to Match"
          >
            <i className="fa-solid fa-table-tennis-paddle-ball text-base md:text-lg"></i>
          </button>
        </div>
      </div>

      <div
        id="chat-messages"
        className="flex-1 overflow-y-auto space-y-6 px-4 md:px-6 pt-4 pb-2 scroll-smooth custom-scrollbar"
      ></div>

      <form
        id="chat-input-form"
        className="flex items-center gap-2 md:gap-3 border-t border-white/10 px-4 md:px-6 py-3 md:py-4 bg-[#1e1f24]/80"
      >
        <input
          id="chat-input"
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-white/5 text-white placeholder:text-white/50 caret-pong-accent px-4 py-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-pong-accent/40 normal-case placeholder:capitalize"
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          className="bg-pong-accent hover:bg-pong-dark-accent text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          <i className="fa-solid fa-paper-plane text-lg"></i>
        </button>
      </form>
    </div>
  );
}
