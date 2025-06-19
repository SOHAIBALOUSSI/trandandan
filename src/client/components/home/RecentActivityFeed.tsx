import { styles } from "@/styles/styles";

export function RecentActivityFeed() {
  return (
    <div className="bg-pong-secondary/10 rounded-xl shadow-md p-6 my-6 max-w-5xl mx-auto">
      <h2 className="text-pong-dark-primary text-xl font-extrabold mb-5 tracking-tight">
        Recent Activity
      </h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-3 hover:bg-white/10 p-3 rounded-md transition-all">
          <i className="fas fa-trophy text-pong-accent text-lg mt-1"></i>
          <div className="text-sm">
            <span className="text-pong-secondary font-semibold">User123</span>{" "}
            <span className="text-pong-dark-primary">won a match against</span>{" "}
            <span className="text-pong-secondary font-semibold">User456</span>
          </div>
        </li>
        <li className="flex items-start gap-3 hover:bg-white/10 p-3 rounded-md transition-all">
          <i className="fas fa-flag text-pong-accent text-lg mt-1"></i>
          <div className="text-sm">
            <span className="text-pong-secondary font-semibold">User789</span>{" "}
            <span className="text-pong-dark-primary">joined the tournament</span>
          </div>
        </li>
        <li className="flex items-start gap-3 hover:bg-white/10 p-3 rounded-md transition-all">
          <i className="fas fa-skull-crossbones text-pong-error text-lg mt-1"></i>
          <div className="text-sm">
            <span className="text-pong-secondary font-semibold">User456</span>{" "}
            <span className="text-pong-dark-primary">lost a match to</span>{" "}
            <span className="text-pong-secondary font-semibold">User123</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
