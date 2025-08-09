import { getWelcomeTitle } from "@/components/home/Hero";
import { fontSizes } from "@/styles/fontSizes";
import { styles } from "@/styles/styles";
import { getUserTitle } from "@/utils/get-user-title";
import { GameActivity, UserProfile } from "types/types";
import { getUserById } from "./get-user-by-id";

let ws: WebSocket | null = null;

function createUserHoverCard(user: UserProfile): HTMLDivElement {
  const card = document.createElement("div");
  card.className =
    "absolute z-50 bg-pong-dark-bg rounded-lg shadow-lg p-4 w-48 text-sm hidden group-hover:block animate-fadeInUp";

  card.innerHTML = `
	<div class="flex items-center gap-2 mb-2">
	  <img src="${user.avatar_url}" alt="${user.username}"
		   class="w-10 h-10 rounded-full object-cover" />
	  <div>
		<p class="font-semibold text-pong-dark-primary">
		  ${getWelcomeTitle(user)} ${user.username}
		</p>
		<p class="text-pong-dark-highlight text-xs">Ranked #${user.rank}</p>
	  </div>
	</div>
	<p class="text-pong-gold text-xs">${getUserTitle(user.rank)}</p>
  `;
  return card;
}

function createUserLink(user: UserProfile): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.className = "relative inline-block group";

  const link = document.createElement("a");
  link.href = `/members/${user.id}`;
  link.setAttribute("data-link", "");
  link.className =
    "text-pong-dark-secondary font-semibold normal-case hover:underline transition";
  link.textContent = user.username;

  const card = createUserHoverCard(user);
  wrapper.appendChild(link);
  wrapper.appendChild(card);

  return wrapper;
}

function WinActivity(
  user: UserProfile,
  targetUser: UserProfile,
  activity: GameActivity
): HTMLLIElement {
  const li = document.createElement("li");
  li.className = `${styles.listStyle} flex items-center justify-between`;

  const leftDiv = document.createElement("div");
  leftDiv.className = "flex items-start gap-2";
  leftDiv.innerHTML = `<i class="fas fa-trophy text-pong-success mt-1"></i>`;

  const textDiv = document.createElement("div");
  textDiv.appendChild(createUserLink(user));
  textDiv.insertAdjacentHTML(
    "beforeend",
    `<span class="text-pong-dark-primary"> won a match against </span>`
  );
  textDiv.appendChild(createUserLink(targetUser));
  leftDiv.appendChild(textDiv);

  const scoreDiv = document.createElement("div");
  scoreDiv.className = `text-pong-dark-secondary font-semibold ${fontSizes.smallTextFontSize}`;

  const userScore =
    activity.playerId === 1
      ? activity.leftPlayerScore
      : activity.rightPlayerScore;

  const enemyScore =
    activity.playerId === 1
      ? activity.rightPlayerScore
      : activity.leftPlayerScore;

  scoreDiv.textContent = `${userScore} - ${enemyScore}`;

  li.appendChild(leftDiv);
  li.appendChild(scoreDiv);

  return li;
}

function LossActivity(
  user: UserProfile,
  targetUser: UserProfile,
  activity: GameActivity
): HTMLLIElement {
  const li = document.createElement("li");
  li.className = `${styles.listStyle} flex items-center justify-between`;

  const leftDiv = document.createElement("div");
  leftDiv.className = "flex items-start gap-2";
  leftDiv.innerHTML = `<i class="fas fa-skull-crossbones text-pong-error mt-1"></i>`;

  const textDiv = document.createElement("div");
  textDiv.appendChild(createUserLink(user));
  textDiv.insertAdjacentHTML(
    "beforeend",
    `<span class="text-pong-dark-primary"> lost a match to </span>`
  );
  textDiv.appendChild(createUserLink(targetUser));
  leftDiv.appendChild(textDiv);

  const scoreDiv = document.createElement("div");
  scoreDiv.className = `text-pong-dark-secondary font-semibold ${fontSizes.smallTextFontSize}`;

  const userScore =
    activity.playerId === 1
      ? activity.leftPlayerScore
      : activity.rightPlayerScore;

  const enemyScore =
    activity.playerId === 1
      ? activity.rightPlayerScore
      : activity.leftPlayerScore;

  scoreDiv.textContent = `${userScore} - ${enemyScore}`;

  li.appendChild(leftDiv);
  li.appendChild(scoreDiv);

  return li;
}

async function renderActivity(
  activity: GameActivity
): Promise<HTMLLIElement | null> {
  if (!activity.userId || !activity.enemyId || !activity.gameEndResult) {
    console.error("Incomplete activity data:", activity);
    return null;
  }

  const user = await getUserById(activity.userId);
  const targetUser = await getUserById(activity.enemyId);

  if (!user || !targetUser) {
    console.error("Missing user or opponent");
    return null;
  }

  switch (activity.gameEndResult) {
    case "Won":
      return WinActivity(user, targetUser, activity);
    case "Lost":
      return LossActivity(user, targetUser, activity);
    default:
      console.error("Unknown gameEndResult:", activity.gameEndResult);
      return null;
  }
}

export async function startRecentActivityListener(): Promise<void> {
  ws = new WebSocket("wss://localhost:9090/game/recent-activity");

  const ul = document.getElementById("recent-activity-list");
  if (!ul) {
    console.error("Recent activity list not found.");
    return;
  }

  // Helper to safely parse stored JSON into an array
  function readStoredActivities(): GameActivity[] {
    const raw = localStorage.getItem("recent-activity");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("Corrupt recent-activity in localStorage, resetting.", err);
      return [];
    }
  }

  // Helper to save (and cap) stored activities
  function saveStoredActivities(activities: GameActivity[]) {
    const CAP = 20;
    const sliced = activities.slice(-CAP);
    try {
      localStorage.setItem("recent-activity", JSON.stringify(sliced));
    } catch (err) {
      console.error("Failed to save recent-activity to localStorage:", err);
    }
  }

  // Render what we already have in localStorage
  const initialActivities = readStoredActivities();
  if (initialActivities.length === 0) {
    ul.innerHTML = `<li class="text-pong-dark-secondary text-center">No recent activity.</li>`;
  } else {
    ul.innerHTML = "";
    for (const activity of initialActivities) {
      try {
        const elem = await renderActivity(activity);
        if (elem) ul.prepend(elem);
      } catch (err) {
        console.error("Failed to render stored activity:", err);
      }
    }
  }

  ws.onopen = () => {
    console.log("WebSocket connected for activity feed.");
  };

  ws.onmessage = async (event: MessageEvent) => {
    // Event may contain a single activity object or an array of activities.
    // We'll parse, normalize to array, append to stored activities, save, and render new ones.
    let incoming: any;
    try {
      incoming = JSON.parse(event.data);
    } catch (err) {
      console.error("Unable to parse incoming activity data:", err);
      return;
    }

    const newActivities: GameActivity[] = Array.isArray(incoming)
      ? incoming
      : [incoming];

    if (newActivities.length === 0) {
      return;
    }

    // Read existing stored activities, append new ones, dedupe (optional)
    const stored = readStoredActivities();

    // Optionally deduplicate by some unique key (e.g. activity.id or timestamp). If no id available, comment out.
    // Here we'll try to dedupe by JSON string if no better key exists.
    const seen = new Set(stored.map((a) => JSON.stringify(a)));
    const toAppend: GameActivity[] = [];
    for (const act of newActivities) {
      const key = JSON.stringify(act);
      if (!seen.has(key)) {
        seen.add(key);
        toAppend.push(act);
      }
    }

    if (toAppend.length === 0) return;

    const merged = stored.concat(toAppend);
    saveStoredActivities(merged);

    // If the "No recent activity." placeholder exists, clear it
    if (
      ul.children.length === 1 &&
      ul.children[0].textContent?.includes("No recent activity")
    ) {
      ul.innerHTML = "";
    }

    // Render only the newly appended activities (in order)
    for (const activity of toAppend) {
      try {
        const elem = await renderActivity(activity);
        if (elem) ul.appendChild(elem);
      } catch (err) {
        console.error("Failed to render incoming activity:", err);
      }
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    ul.innerHTML = `<li class="text-pong-error text-center">Unable to load activity feed.</li>`;
  };

  ws.onclose = () => {
    ws = null;
    console.log("WebSocket connection closed, attempting to reconnect...");
    setTimeout(() => {
      startRecentActivityListener();
    }, 5000);
  };
}

export function stopRecentActivityListener() {
  if (ws) {
    ws.close();
    ws = null;
    console.log("Recent Activity WebSocket connection stopped.");
  }
}
