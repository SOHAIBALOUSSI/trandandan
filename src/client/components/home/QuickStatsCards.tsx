import { styles } from "@/styles/styles";
import { getCurrentUser } from "@/utils/user-store";

export function QuickStatsCards() {
  const user = getCurrentUser();
  // after all the data will be dynamic 

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full max-w-5xl mx-auto px-4">
      <div className="bg-pong-dark-secondary/10 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-[1.02] transition-transform duration-300">
        <span className="text-pong-dark-accent text-2xl font-extrabold">
          {user?.solde} F
        </span>
        <span className="text-pong-dark-primary/90 text-sm mt-1 font-medium">
          Solde
        </span>
      </div>

      <div className="bg-pong-dark-secondary/10 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-[1.02] transition-transform duration-300">
        <span className="text-pong-dark-primary text-2xl font-extrabold">
          12
        </span>
        <span className="text-pong-dark-primary/90 text-sm mt-1 font-medium">
          Matches
        </span>
      </div>

      <div className="bg-green-100/20 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-[1.02] transition-transform duration-300">
        <span className="text-pong-success text-2xl font-extrabold">8</span>
        <span className="text-pong-dark-primary/90 text-sm mt-1 font-medium">
          Wins
        </span>
      </div>

      <div className="bg-red-100/20 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-[1.02] transition-transform duration-300">
        <span className="text-pong-error text-2xl font-extrabold">4</span>
        <span className="text-pong-dark-primary/90 text-sm mt-1 font-medium">
          Losses
        </span>
      </div>
    </div>
  );
}
