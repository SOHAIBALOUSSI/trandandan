import { styles } from "@/styles/styles";
import FemaleAvatar from "@/assets/female.png";

export function LeaderboardPreview() {
  return (
    <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 mb-10">
      <h3 className="text-xl font-extrabold text-pong-dark-primary mb-5 tracking-tight">
        Hall of Champions
      </h3>
      <ol className="space-y-3">
        <li className="flex items-center gap-4 p-3 rounded-md hover:bg-white/10 transition-all">
          <span className="text-lg font-bold text-pong-accent">1</span>
          <img
            src={FemaleAvatar}
            alt="Sopu"
            className="w-10 h-10 rounded-full border-2 border-pong-accent shadow"
          />
          <span className="font-semibold text-pong-dark-primary">Sopu</span>
          <span className="ml-auto text-sm text-pong-secondary italic">
            Level 13.37
          </span>
        </li>
        <li className="flex items-center gap-4 p-3 rounded-md hover:bg-white/10 transition-all">
          <span className="text-lg font-bold text-pong-accent">2</span>
          <img
            src={FemaleAvatar}
            alt="Bijou"
            className="w-10 h-10 rounded-full border-2 border-pong-accent/50 shadow-sm"
          />
          <span className="font-semibold text-pong-dark-primary">Bijou</span>
          <span className="ml-auto text-sm text-pong-secondary italic">
            Level 4.2
          </span>
        </li>
        {/* mn b3d this will be dynamic ... */}
      </ol>
    </div>
  );
}
