import { getUserById } from "@/services/get-user-by-id";
import { fontSizes } from "@/styles/fontSizes";
import { styles } from "@/styles/styles";
import { displayToast } from "@/utils/display-toast";
import { getUserTitle } from "@/utils/get-user-title";
import { GameActivity, UserProfile } from "types/types";
import { getWelcomeTitle } from "./Hero";

function createUserHoverCard(user: UserProfile): HTMLDivElement {
  const card = document.createElement("div");
  card.className =
    "absolute z-50 bg-pong-dark-bg rounded-lg shadow-lg p-4 w-48 text-sm hidden group-hover:block animate-fadeInUp";
  card.innerHTML = `
    <div class="flex items-center gap-2 mb-2">
      <img src="${user.avatar_url}" alt="${user.username}"
           class="w-10 h-10 rounded-full object-cover" />
      <div>
        <p class="font-semibold text-pong-dark-primary"> ${getWelcomeTitle(
          user
        )} ${user.username}</p>
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
) {
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
  scoreDiv.textContent = `${activity.leftPlayerScore} - ${activity.rightPlayerScore}`;

  li.appendChild(leftDiv);
  li.appendChild(scoreDiv);

  return li;
}

function LossActivity(
  user: UserProfile,
  targetUser: UserProfile,
  activity: GameActivity
) {
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
  scoreDiv.textContent = `${activity.leftPlayerScore} - ${activity.rightPlayerScore}`;

  li.appendChild(leftDiv);
  li.appendChild(scoreDiv);

  return li;
}

async function renderActivity(activity: GameActivity) {
  const user: UserProfile | null = await getUserById(activity.leftPlayerId);
  const targetUser: UserProfile | null = await getUserById(
    activity.rightPlayerId
  );
  if (!user || !targetUser) return null;

  switch (activity.gameEndResult) {
    case "WIN":
      return WinActivity(user, targetUser, activity);
    case "LOSE":
      return LossActivity(user, targetUser, activity);
    default:
      return null;
  }
}

export function RecentActivityFeed() {
  const wrapper = document.createElement("div");
  wrapper.className =
    "bg-pong-secondary/10 rounded-lg py-6 px-4 md:p-10 w-full max-w-5xl mx-auto border border-pong-dark-secondary/10";

  const title = document.createElement("h2");
  title.className = `text-pong-dark-primary font-bold mb-8 tracking-tight ${fontSizes.smallTitleFontSize}`;
  title.textContent = "Recent Activity";
  wrapper.appendChild(title);

  const ul = document.createElement("ul");
  ul.className = `space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`;
  wrapper.appendChild(ul);

  const fakeData: GameActivity[] = [
    {
      leftPlayerId: 1,
      rightPlayerId: 2,
      gameEndResult: "WIN",
      leftPlayerScore: 5,
      rightPlayerScore: 2,
    },
    {
      leftPlayerId: 2,
      rightPlayerId: 1,
      gameEndResult: "LOSE",
      leftPlayerScore: 4,
      rightPlayerScore: 5,
    },
    {
      leftPlayerId: 3,
      rightPlayerId: 4,
      gameEndResult: "WIN",
      leftPlayerScore: 5,
      rightPlayerScore: 1,
    },
    {
      leftPlayerId: 4,
      rightPlayerId: 3,
      gameEndResult: "LOSE",
      leftPlayerScore: 3,
      rightPlayerScore: 5,
    },
    {
      leftPlayerId: 3,
      rightPlayerId: 4,
      gameEndResult: "WIN",
      leftPlayerScore: 5,
      rightPlayerScore: 1,
    },
    {
      leftPlayerId: 4,
      rightPlayerId: 3,
      gameEndResult: "LOSE",
      leftPlayerScore: 3,
      rightPlayerScore: 5,
    },
  ];

  let activities: GameActivity[] = [...fakeData];

  ul.innerHTML = "";
  activities.forEach(async (activity) => {
    const elem = await renderActivity(activity);
    if (elem) ul.appendChild(elem);
  });

  const ws = new window.WebSocket("wss://localhost:9090/game/recent-activity");

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        activities = [...data, ...activities].slice(0, 20);
        ul.innerHTML = "";
        activities.forEach(async (activity) => {
          const elem = await renderActivity(activity);
          if (elem) ul.appendChild(elem);
        });
      }
    } catch (err) {
      displayToast(
        "The club’s lights are out at the moment. Try again shortly.",
        "error"
      );
    }
  };

  ws.onerror = () => {
    ul.innerHTML = `<li class="text-pong-error text-center">Unable to load activity feed.</li>`;
  };

  return wrapper;
}
