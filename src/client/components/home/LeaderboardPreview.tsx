import { styles } from "@/styles/styles";
import FemaleAvatar from "@/assets/female.png";

export function LeaderboardPreview() {
  return (
    <div className="bg-pong-secondary/10 rounded-xl shadow p-6 mb-8">
      <h3 className="text-lg font-bold text-pong-dark-primary mb-4">
        Top Players
      </h3>
      <ol className="space-y-2">
        <li className="flex items-center gap-3">
          <img src={FemaleAvatar} className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-pong-accent">1. Sopu</span>
          <span className="ml-auto text-pong-dark-primary">Level 13.37</span>
        </li>
        <li className="flex items-center gap-3">
          <img src={FemaleAvatar} className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-pong-accent">2. Bijou</span>
          <span className="ml-auto text-pong-dark-primary">Level 12.11</span>
        </li>
        {/* more players mn be3d ... */}
      </ol>
    </div>
  );
}
