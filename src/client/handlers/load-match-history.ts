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
    matchHistoryList.innerHTML = `<p class="text-gray-400">No recent matches found.</p>`;
    return;
  }

  history.forEach((match) => {
    const listItem = document.createElement("li");
    listItem.className = "flex items-center justify-between";

    const matchInfo = document.createElement("span");
    matchInfo.textContent = `Match ID: ${match.id} - Game duration: ${match.game_duration} min`;
    listItem.appendChild(matchInfo);

    const score = document.createElement("span");
    score.textContent = `Score: ${match.game_end_result}`;
    listItem.appendChild(score);

    matchHistoryList.appendChild(listItem);
  });
}
