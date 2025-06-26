import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import FemaleAvatar from "@/assets/female.png";
import MaleAvatar from "@/assets/male.png";
import { UserProfile } from "types/types";

type UserRank = {
  rank: number;
  name: string;
  level: string;
  avatarUrl: string;
};

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
      <div className="flex items-center justify-between mt-6">
        <div className={`flex items-center gap-2 bg-black/70 rounded-md px-3 py-2 shadow ${fontSizes.verysmallTextFontSize}`}>
          <span className="font-bold text-pong-accent">Your Rank</span>
          <span className="font-semibold text-pong-dark-primary">
            {user?.rank}
          </span>
          <img
            src={user?.avatar_url}
            alt="Your Avatar"
            className="w-7 h-7 rounded-full border border-pong-accent"
          />
          <span className="text-pong-dark-primary">{user?.username}</span>
          <span className="text-pong-secondary italic">
            Level {user?.level}
          </span>
        </div>
        <a
          href="chamber"
          className="text-pong-accent hover:underline font-semibold ml-4"
          data-link
        >
          View More &rarr;
        </a>
      </div>
    </div>
  );
}
