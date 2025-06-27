import { fontSizes } from "@/styles/fontSizes";
import FemaleAvatar from "@/assets/female.png";
import MaleAvatar from "@/assets/male.png";
import { UserProfile } from "types/types";
import { UserRank } from "types/types";
import { styles } from "@/styles/styles";

export function LeaderboardPreview(props: { user: UserProfile | null }) {
  const { user } = props;

  const topThree: UserRank[] = [
    { rank: 1, name: "Sopu", level: "13.37", avatarUrl: FemaleAvatar },
    { rank: 2, name: "Bijou", level: "4.2", avatarUrl: FemaleAvatar },
    { rank: 3, name: "Messi", level: "3.14", avatarUrl: MaleAvatar },
  ];

  return (
    <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto">
      <h2
        className={`text-pong-dark-primary font-bold mb-5 tracking-tight ${fontSizes.subtitleFontSize}`}
      >
        Hall of Champions
      </h2>

      <ol className={`space-y-3 ${fontSizes.smallTextFontSize}`}>
        {topThree.map((user) => (
          <li
            key={user.rank}
            className="flex items-center gap-4 p-3 rounded-md hover:bg-white/10 transition-all"
          >
            <span className="text-lg font-bold text-pong-accent w-6 text-center">
              {user.rank}
            </span>
            <img
              src={user.avatarUrl}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full shadow"
            />
            <span className="font-semibold text-pong-dark-primary">
              {user.name}
            </span>
            <span className="ml-auto text-sm text-pong-secondary italic">
              Level {user.level}
            </span>
          </li>
        ))}
      </ol>

      <div
        className={`flex items-center justify-between mt-6 ${fontSizes.verysmallTextFontSize}`}
      >
        <div className="flex items-center gap-4 bg-gradient-to-r from-black/70 to-black/60 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/10 transition hover:border-pong-accent">
          <img
            src={user?.avatar_url}
            alt="Your Avatar"
            className="w-9 h-9 rounded-full shadow-md"
          />
          <div className="flex flex-col">
            <span className="text-white/70">Your Rank</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-pong-accent">#{user?.rank}</span>
              <span className="bg-pong-dark-bg text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Level {user?.level}
              </span>
            </div>
          </div>
          <i className="fa-solid fa-trophy text-yellow-400 ml-auto text-xl"></i>
        </div>

        <a href="chamber" className={styles.customBtnLink} data-link>
          View More &rarr;
        </a>
      </div>
    </div>
  );
}
