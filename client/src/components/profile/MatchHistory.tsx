import { fontSizes } from "@/styles/fontSizes";
import { UserProfile } from "types/types";
import { loadMatchHistory } from "@/handlers/load-match-history";

export function MatchHistory(props: { user: UserProfile }) {
  setTimeout(() => {
    loadMatchHistory(props.user);
  }, 0);

  return (
    <div
      className="
        relative 
        bg-pong-dark-custom
        border border-pong-dark-highlight/30 
        rounded-2xl shadow-xl 
        p-6 md:p-10 
        w-full max-w-5xl mx-auto
        backdrop-blur-md
      "
    >
      <span className="absolute top-0 left-0 w-2.5 h-full bg-pong-accent rounded-l-2xl"></span>

      <h2
        className={`
          flex items-center gap-3
          text-white font-extrabold mb-6 tracking-tight 
          ${fontSizes.smallTitleFontSize}
        `}
      >
        <i className="fa-solid fa-scroll text-pong-accent"></i>
        Chronicles of Play
      </h2>

      <ul
        id="match-history-list"
        className={`
          space-y-6 
          ${fontSizes.bodyFontSize} 
          max-h-[500px] overflow-y-auto pr-4 md:pr-8
          custom-scrollbar
		  py-4
        `}
      ></ul>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
