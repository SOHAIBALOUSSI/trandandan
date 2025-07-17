import { getAllUsers } from "@/services/get-users";
import { navigateTo } from "@/utils/navigate-to-link";

let allUsersCache: { id: number; username: string }[] = [];

export async function handleSearchMemberLive(query: string) {
  if (!allUsersCache.length) {
    allUsersCache = await getAllUsers();
  }

  const matches = allUsersCache.filter((user) =>
    user.username.toLowerCase().includes(query.trim().toLowerCase())
  );

  const oldList = document.getElementById("search-results");
  if (oldList) oldList.remove();

  if (matches.length > 0 && query.trim()) {
    const resultList = document.createElement("ul");
    resultList.className =
      "text-center absolute top-12 left-0 w-full animate-fadeInUp bg-pong-dark-bg text-white rounded shadow z-50 border border-pong-dark-primary";
    resultList.id = "search-results";
    matches.forEach((user) => {
      const li = document.createElement("li");
      li.className = "p-2 hover:bg-pong-dark-accent cursor-pointer normal-case";
      li.textContent = user.username;
      li.onclick = () => {
        navigateTo(`/members/${user.id}`);
        resultList.remove();
      };
      resultList.appendChild(li);
    });
    const searchBar = document.getElementById("search-bar");
    if (searchBar && searchBar.parentElement) {
      searchBar.parentElement.appendChild(resultList);
    }
  }
}
