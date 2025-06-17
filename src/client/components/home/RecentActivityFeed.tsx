import { styles } from "@/styles/styles";

export function RecentActivityFeed() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-pong-primary text-lg font-bold mb-4">
        Recent Activity
      </h2>
      <ul className="space-y-4">
        <li className="flex items-center">
          <span className="text-pong-secondary text-sm">User123</span>
          <span className="text-pong-primary text-sm ml-2">
            won a match against User456
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-pong-secondary text-sm">User789</span>
          <span className="text-pong-primary text-sm ml-2">
            joined the tournament
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-pong-secondary text-sm">User456</span>
          <span className="text-pong-primary text-sm ml-2">
            lost a match against User123
          </span>
        </li>
      </ul>
    </div>
  );
}
