import { displayPerformanceMetrics } from "@/utils/display-metrics";
import { UserProfile } from "types/types";

export function PerformanceMetrics(props: { user: UserProfile }) {
  setTimeout(() => {
    displayPerformanceMetrics(props.user);
  }, 0);

  return (
    <div
      id="performance-metrics"
      className="bg-pong-dark-highlight/10 p-6 rounded-lg shadow-xl border border-pong-dark-highlight/10"
    ></div>
  );
}
