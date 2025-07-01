import { fontSizes } from "@/styles/fontSizes";
import FemaleAvatar from "@/assets/default-female-avatar.png";
import MaleAvatar from "@/assets/default-male-avatar.png";
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
        className={`text-pong-dark-primary font-bold mb-8 tracking-tight ${fontSizes.smallTitleFontSize}`}
      >
        BHV Club’s Elite
      </h2>

      <ol className={`space-y-3 ${fontSizes.bodyFontSize}`}>
        {topThree.map((user) => (
          <li
            key={user.rank}
            className={styles.listStyle + " items-center gap-4"}
          >
            <span className="text-sm md:text-lg font-bold text-pong-dark-accent w-6 text-center">
              {user.rank}
            </span>
            <img
              src={user.avatarUrl}
              alt="Profile Avatar"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
            <span className="font-semibold text-pong-dark-primary">
              {user.name}
            </span>
            <span className="ml-auto text-xs md:text-sm text-pong-secondary italic">
              Level {user.level}
            </span>
          </li>
        ))}
      </ol>

      <div className="flex items-center justify-between mt-8">
        <div className="bg-pong-dark-bg/50 rounded-xl px-4 py-3 border border-white/10 text-white/70">
          <span className="block text-sm">
            {user?.rank && user.rank <= 10
              ? "You're close to greatness — keep pushing!"
              : "Your journey has just begun..."}
          </span>
        </div>

        <a href="chamber" className={styles.darkPrimaryBtn} data-link>
          View Full Rankings
        </a>
      </div>
    </div>
  );
}
