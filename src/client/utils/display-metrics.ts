import { getUserHistory } from "@/services/get-user-history";
import { UserProfile, UserHistory } from "types/types";

export async function displayPerformanceMetrics(user: UserProfile) {
  const metricsContainer = document.getElementById("performance-metrics");
  if (!metricsContainer) return;
  metricsContainer.innerHTML = "";

  const history: UserHistory[] = await getUserHistory(user.id);
  if (!history || history.length === 0) {
    metricsContainer.innerHTML = `
      <p class="text-pong-dark-primary text-center py-6">No performance data available yet.</p>`;
    return;
  }

  const wins = history.filter((h) => h.game_end_result === "Won").length;
  const losses = history.length - wins;
  const totalMatches = history.length;

  const avgDuration = (
    history.reduce((acc, h) => acc + h.game_duration, 0) / totalMatches
  ).toFixed(1);

  let pointsScored = 0;
  let pointsConceded = 0;
  history.forEach((h) => {
    pointsScored += h.left_player_score;
    pointsConceded += h.right_player_score;
  });

  const winRate = Math.round((wins / totalMatches) * 100);

  metricsContainer.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

      <div class="bg-pong-dark-highlight/10 p-6 rounded-xl shadow-md flex flex-col items-center">
        <h3 class="text-lg font-bold mb-4 text-pong-accent">Win / Loss</h3>
        <div class="relative w-24 h-24">
          <svg class="transform -rotate-90 w-full h-full">
            <circle cx="50%" cy="50%" r="36" stroke="gray" stroke-width="8" fill="none"/>
            <circle cx="50%" cy="50%" r="36"
              stroke="url(#grad)"
              stroke-width="8" fill="none"
              stroke-dasharray="${2 * Math.PI * 36}"
              stroke-dashoffset="${
                2 * Math.PI * 36 * (1 - wins / totalMatches)
              }"
              stroke-linecap="round"/>
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#34D399"/>
                <stop offset="100%" stop-color="#10B981"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xl font-bold">${winRate}%</span>
          </div>
        </div>
        <p class="mt-2 text-sm text-gray-300">${wins} Wins / ${losses} Losses</p>
      </div>

      <div class="bg-pong-dark-highlight/10 p-6 rounded-xl shadow-md flex flex-col items-center">
        <h3 class="text-lg font-bold mb-4 text-pong-accent">Avg Match Duration</h3>
        <div class="text-4xl font-extrabold text-yellow-400">${avgDuration}m</div>
        <p class="mt-2 text-gray-300 text-sm">Per Match</p>
      </div>

      <div class="bg-pong-dark-highlight/10 p-6 rounded-xl shadow-md flex flex-col items-center">
        <h3 class="text-lg font-bold mb-4 text-pong-accent">Points Scored vs Conceded</h3>
        <div class="w-full">
          <div class="flex justify-between text-xs text-gray-400">
            <span>Scored</span>
            <span>${pointsScored}</span>
          </div>
          <div class="w-full bg-gray-700 h-2 rounded-full mb-3">
            <div class="h-2 bg-green-500 rounded-full" style="width:${
              (pointsScored / (pointsScored + pointsConceded)) * 100
            }%;"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-400">
            <span>Conceded</span>
            <span>${pointsConceded}</span>
          </div>
          <div class="w-full bg-gray-700 h-2 rounded-full">
            <div class="h-2 bg-red-500 rounded-full" style="width:${
              (pointsConceded / (pointsScored + pointsConceded)) * 100
            }%;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}
