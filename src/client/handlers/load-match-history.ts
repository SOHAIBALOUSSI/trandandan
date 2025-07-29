import { getUserById } from "@/services/get-user-by-id";
import { getUserHistory } from "@/services/get-user-history";
import { fontSizes } from "@/styles/fontSizes";
import { UserHistory, UserProfile } from "types/types";

export async function loadMatchHistory(user: UserProfile) {
  const matchHistoryList = document.getElementById(
    "match-history-list"
  ) as HTMLUListElement;
  if (!matchHistoryList) return;

  matchHistoryList.innerHTML = "";

  let history: UserHistory[] = await getUserHistory(user.id);

  if (!history || history.length === 0) {
    // matchHistoryList.innerHTML = `<p class="text-pong-dark-secondary text-center ${fontSizes.bodyFontSize}">No recent matches found.</p>`;
    // return;
    history = [
      {
        id: 1,
        user_name: "Demo",
        enemy_id: 101,
        user_id: user.id,
        left_player_score: 5,
        right_player_score: 3,
        game_duration: 6,
        game_end_result: "Won",
        left_player_ball_hit: 45,
        right_player_ball_hit: 38,
      },
      {
        id: 2,
        user_name: "Demo",
        enemy_id: 102,
        user_id: user.id,
        left_player_score: 4,
        right_player_score: 5,
        game_duration: 8,
        game_end_result: "Lost",
        left_player_ball_hit: 50,
        right_player_ball_hit: 54,
      },
      {
        id: 3,
        user_name: "Demo",
        enemy_id: 103,
        user_id: user.id,
        left_player_score: 7,
        right_player_score: 1,
        game_duration: 5,
        game_end_result: "Won",
        left_player_ball_hit: 60,
        right_player_ball_hit: 25,
      },
    ];
  }

  for (const match of history) {
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

    const enemyUser = await getUserById(match.enemy_id);

    const listItem = document.createElement("li");
    listItem.className = `
      group border border-pong-dark-secondary/30 
      rounded-xl p-5 m-4 shadow-md bg-gradient-to-br 
      from-pong-dark-highlight/20 to-pong-dark-highlight/5 
      transition hover:border-pong-accent/50 hover:shadow-lg hover:scale-[1.02]
      flex flex-col gap-3
    `;

    const header = document.createElement("div");
    header.className = "flex justify-between items-center";

    const resultBadge = document.createElement("span");
    resultBadge.textContent = isWin ? "🏆 Won" : "❌ Lost";
    resultBadge.className = `px-3 py-1 rounded-full text-sm font-semibold tracking-wide shadow ${
      isWin ? "bg-pong-success text-white" : "bg-pong-error text-white"
    }`;

    const duration = document.createElement("span");
    duration.textContent = `⏱ ${match.game_duration} min`;
    duration.className = "text-sm text-pong-dark-secondary";

    header.appendChild(resultBadge);
    header.appendChild(duration);

    const scoreLine = document.createElement("p");
    scoreLine.className = "text-xl font-extrabold text-white tracking-tight";
    scoreLine.textContent = `${myScore} - ${enemyScore}`;

    const enemy = document.createElement("p");
    enemy.className = "text-sm text-gray-300 flex items-center gap-2";
    enemy.innerHTML = `<i class="fa-solid fa-user text-pong-accent"></i> Opponent: <span class="font-semibold">${
      enemyUser?.username || "Unknown"
    }</span>`;

    const hits = document.createElement("div");
    hits.className = "w-full mt-1";
    hits.innerHTML = `
      <div class="text-xs text-gray-400 mb-1">Ball Hits</div>
      <div class="bg-gray-700 h-2 rounded-full overflow-hidden mb-1">
        <div class="h-2 bg-pong-success" style="width:${Math.min(
          (myHits / (myHits + enemyHits)) * 100,
          100
        )}%;"></div>
      </div>
      <div class="flex justify-between text-xs text-gray-400">
        <span>You: ${myHits}</span>
        <span>Opponent: ${enemyHits}</span>
      </div>
    `;

    listItem.appendChild(header);
    listItem.appendChild(scoreLine);
    listItem.appendChild(enemy);
    listItem.appendChild(hits);

    matchHistoryList.appendChild(listItem);
  }
}
