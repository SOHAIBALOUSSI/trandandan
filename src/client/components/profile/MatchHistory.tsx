import { fontSizes } from "@/styles/fontSizes";
import { UserProfile } from "types/types";
import { loadMatchHistory } from "@/handlers/load-match-history";

export function MatchHistory(props: { user: UserProfile }) {
  setTimeout(() => {
    loadMatchHistory(props.user);
  }, 0);

  return (
    <div className="bg-pong-dark-custom rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto">
      <h2
        className={`text-pong-dark-primary font-bold mb-8 tracking-tight ${fontSizes.smallTitleFontSize}`}
      >
        Chronicles of Play
      </h2>
      <ul
        id="match-history-list"
        className={`space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-4 md:pr-8`}
      >
        <p className="text-gray-400">No recent matches found.</p>
      </ul>
    </div>
  );
}
