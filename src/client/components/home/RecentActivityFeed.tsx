import { fontSizes } from "@/styles/fontSizes";
import { styles } from "@/styles/styles";
import { displayToast } from "@/utils/display-toast";
import { GameActivity } from "types/types";

function WinActivity(user: string, targetUser: string) {
  const li = document.createElement("li");
  li.className = styles.listStyle;
  li.innerHTML = `
    <i class="fas fa-trophy text-pong-success mt-1"></i>
    <div>
      <span class="text-pong-dark-secondary font-semibold normal-case">${user}</span>
      <span class="text-pong-dark-primary"> won a match against </span>
      <span class="text-pong-dark-secondary font-semibold normal-case">${targetUser}</span>
    </div>
  `;
  return li;
}

function LossActivity(user: string, targetUser: string) {
  const li = document.createElement("li");
  li.className = styles.listStyle;
  li.innerHTML = `
    <i class="fas fa-skull-crossbones text-pong-error mt-1"></i>
    <div>
      <span class="text-pong-dark-secondary font-semibold normal-case">${user}</span>
      <span class="text-pong-dark-primary"> lost a match to </span>
      <span class="text-pong-dark-secondary font-semibold normal-case">${targetUser}</span>
    </div>
  `;
  return li;
}

function renderActivity(activity: GameActivity) {
  switch (activity.gameEndResult) {
    case "WIN":
      return WinActivity(activity.userId, activity.enemyId);
    case "LOSE":
      return LossActivity(activity.userId, activity.enemyId);
    default:
      return null;
  }
}

export function RecentActivityFeed() {
  const wrapper = document.createElement("div");
  wrapper.className =
    "bg-pong-secondary/10 rounded-xl shadow-md p-6 md:p-10 w-full max-w-5xl mx-auto";

  const title = document.createElement("h2");
  title.className = `text-pong-dark-primary font-bold mb-8 tracking-tight ${fontSizes.smallTitleFontSize}`;
  title.textContent = "Recent Activity";
  wrapper.appendChild(title);

  const ul = document.createElement("ul");
  ul.className = `space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`;
  wrapper.appendChild(ul);

  const fakeData: GameActivity[] = [
    { userId: "John snow", enemyId: "Night king", gameEndResult: "WIN" },
    { userId: "Night king", enemyId: "John snow", gameEndResult: "LOSE" },
	{ userId: "Arya Stark", enemyId: "Cersei Lannister", gameEndResult: "WIN" },
	{ userId: "Cersei Lannister", enemyId: "Arya Stark", gameEndResult: "LOSE" },
	{ userId: "Jon Snow", enemyId: "Daenerys Targaryen", gameEndResult: "WIN" },
	{ userId: "Daenerys Targaryen", enemyId: "Jon Snow", gameEndResult: "LOSE" },
  ];

  let activities: GameActivity[] = [...fakeData];

  ul.innerHTML = "";
  activities.forEach((activity) => {
    const elem = renderActivity(activity);
    if (elem) ul.appendChild(elem);
  });

  const ws = new window.WebSocket("ws://localhost:5000/recent-activity");

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        activities = [...data, ...activities].slice(0, 20);
        ul.innerHTML = "";
        activities.forEach((activity) => {
          const elem = renderActivity(activity);
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
