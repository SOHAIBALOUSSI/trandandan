import { getUserById } from "@/services/get-user-by-id";
import { getUserHistory } from "@/services/get-user-history";
import { UserHistory, UserProfile } from "types/types";

export async function loadMatchHistory(user: UserProfile) {
  const matchHistoryList = document.getElementById(
    "match-history-list"
  ) as HTMLUListElement;
  if (!matchHistoryList) return;

  matchHistoryList.innerHTML = "";

  const history: UserHistory[] = await getUserHistory(user.id);
  if (!history || history.length === 0) {
    matchHistoryList.innerHTML = `<p class="text-pong-dark-primary">No recent matches found.</p>`;
    return;
  }

  history.forEach(async (match) => {
    const isWin = match.game_end_result === "Won";
    const enemyScore =
      user.id === match.user_id
        ? match.right_player_score
        : match.left_player_score;
    const myScore =
      user.id === match.user_id
        ? match.left_player_score
        : match.right_player_score;
    const myHits =
      user.id === match.user_id
        ? match.left_player_ball_hit
        : match.right_player_ball_hit;
    const enemyHits =
      user.id === match.user_id
        ? match.right_player_ball_hit
        : match.left_player_ball_hit;

    const enemyId = await getUserById(match.enemy_id);

    const listItem = document.createElement("li");
    listItem.className =
      "border border-pong-dark-secondary/30 rounded-xl p-4 mb-3 shadow-sm bg-pong-dark-highlight/10 flex flex-col gap-2";

    const header = document.createElement("div");
    header.className = "flex justify-between items-center";

    const resultBadge = document.createElement("span");
    resultBadge.textContent = isWin ? "🏆 Won" : "❌ Lost";
    resultBadge.className = `px-3 py-1 rounded-full text-sm font-semibold ${
      isWin ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`;

    const duration = document.createElement("span");
    duration.textContent = `⏱ ${match.game_duration} min`;
    duration.className = "text-sm text-gray-400";

    header.appendChild(resultBadge);
    header.appendChild(duration);

    const scoreLine = document.createElement("p");
    scoreLine.className = "text-lg font-bold text-white";
    scoreLine.textContent = `Score: ${myScore} - ${enemyScore}`;

    const enemy = document.createElement("p");
    enemy.className = "text-sm text-gray-300";
    enemy.textContent = `Opponent: ${enemyId?.username || "Unknown"}`;

    const hits = document.createElement("p");
    hits.className = "text-sm text-gray-400";
    hits.textContent = `Hits: You - ${myHits}, Opponent - ${enemyHits}`;

    listItem.appendChild(header);
    listItem.appendChild(scoreLine);
    listItem.appendChild(enemy);
    listItem.appendChild(hits);

    matchHistoryList.appendChild(listItem);
  });
}
