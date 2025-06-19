import { styles } from "@/styles/styles";
import FemaleAvatar from "@/assets/female.png";

function UserCard(props: {
  rank: string;
  name: string;
  level: string;
  avatarUrl: string;
}) {
  return (
    <li className="flex items-center gap-4 p-3 rounded-md hover:bg-white/10 transition-all">
      <span className="text-lg font-bold text-pong-accent">{props.rank}</span>
      <img
        src={props.avatarUrl}
        alt="Profile Avatar"
        className="w-10 h-10 rounded-full border-2 border-pong-accent shadow"
      />
      <span className="font-semibold text-pong-dark-primary">{props.name}</span>
      <span className="ml-auto text-sm text-pong-secondary italic">
        Level {props.level}
      </span>
    </li>
  );
}

export function LeaderboardPreview() {
  return (
    <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 my-6 max-w-5xl mx-auto">
      <h3 className="text-xl font-extrabold text-pong-dark-primary mb-5 tracking-tight">
        Hall of Champions
      </h3>
      <ol className="space-y-3">
        <UserCard rank="1" name="Sopu" level="13.37" avatarUrl={FemaleAvatar} />
        <UserCard rank="2" name="Bijou" level="4.2" avatarUrl={FemaleAvatar} />
        {/* mn b3d this will be dynamic ... */}
      </ol>
    </div>
  );
}
