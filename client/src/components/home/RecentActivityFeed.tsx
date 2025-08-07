import { fontSizes } from "@/styles/fontSizes";
import {
  startRecentActivityListener,
  stopRecentActivityListener,
} from "@/services/recent-activity-service";

export function RecentActivityFeed(): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.className =
    "bg-pong-secondary/10 rounded-lg py-6 px-4 md:p-10 w-full max-w-5xl mx-auto border border-pong-dark-secondary/10";

  const title = document.createElement("h2");
  title.className = `text-pong-dark-primary font-bold mb-8 tracking-tight ${fontSizes.smallTitleFontSize}`;
  title.textContent = "Recent Activity";
  wrapper.appendChild(title);

  const ul = document.createElement("ul");
  ul.id = "recent-activity-list";
  ul.className = `space-y-6 ${fontSizes.bodyFontSize} max-h-[340px] overflow-y-auto pr-2`;
  ul.innerHTML = `<li class="text-pong-dark-secondary text-center">No recent activity.</li>`;
  wrapper.appendChild(ul);

  startRecentActivityListener();

  window.addEventListener("beforeunload", stopRecentActivityListener);

  return wrapper;
}
