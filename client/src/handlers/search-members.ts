import { getAllUsers } from "@/services/get-all-users";
import { getUserById } from "@/services/get-user-by-id";
import { getUserTitle } from "@/utils/get-user-title";
import { navigateTo } from "@/utils/navigate-to-link";

let allUsersCache: { id: number; username: string }[] = [];

export async function handleSearchMembers(query: string) {
  const searchBar = document.getElementById("search-bar") as HTMLInputElement;
  if (!searchBar) return;

  const oldList = document.getElementById("search-results");
  if (oldList) oldList.remove();

  if (!query.trim()) return;

  if (!allUsersCache.length) {
    allUsersCache = await getAllUsers();
  }

  const matches = allUsersCache.filter((user) =>
    user.username.toLowerCase().includes(query.trim().toLowerCase())
  );

  if (matches.length === 0) return;

  const resultList = document.createElement("ul");
  resultList.id = "search-results";
  resultList.className =
    "absolute top-14 left-0 w-full max-h-72 overflow-y-auto animate-fadeInUp bg-pong-dark-custom text-white rounded-xl shadow-lg z-50 border border-pong-dark-highlight/30 backdrop-blur-md";

  for (const user of matches) {
    const u = await getUserById(user.id);
    if (!u) continue;

    const li = document.createElement("li");
    li.className =
      "flex items-center gap-3 p-3 hover:bg-pong-dark-accent/10 cursor-pointer transition-colors border-b border-pong-dark-highlight/20 last:border-none";

    const avatar = document.createElement("img");
    avatar.src = u.avatar_url;
    avatar.alt = u.username;
    avatar.className = "w-10 h-10 rounded-full object-cover";

    const info = document.createElement("div");
    info.className = "flex flex-col";

    const username = document.createElement("span");
    username.textContent = u.username;
    username.className = "font-semibold text-pong-dark-primary normal-case";

    const title = document.createElement("span");
    title.textContent = getUserTitle(u.rank);
    title.className = "text-xs text-pong-dark-accent";

    info.appendChild(username);
    info.appendChild(title);

    li.appendChild(avatar);
    li.appendChild(info);

    li.onclick = () => {
      navigateTo(`/members/${u.id}`);
      resultList.remove();
    };

    resultList.appendChild(li);
  }

  if (searchBar.parentElement) {
    searchBar.parentElement.appendChild(resultList);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") resultList.remove();
  });
}
