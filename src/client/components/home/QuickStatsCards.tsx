import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";

export function QuickStatsCards() {
  const user = getCurrentUser();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
        <span className="text-pong-accent text-2xl font-bold">
          {user?.solde}
        </span>
        <span className="text-pong-primary text-sm mt-1">Solde</span>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
        <span className="text-pong-accent text-2xl font-bold">12</span>
        <span className="text-pong-primary text-sm mt-1">Matches</span>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
        <span className="text-pong-success text-2xl font-bold">8</span>
        <span className="text-pong-primary text-sm mt-1">Wins</span>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
        <span className="text-pong-error text-2xl font-bold">4</span>
        <span className="text-pong-primary text-sm mt-1">Losses</span>
      </div>
    </div>
  );
}
