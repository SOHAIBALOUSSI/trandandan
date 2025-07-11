import { getBlockedUsers } from "@/services/get-blocked";
import { getUserById } from "@/services/get-user-by-id";
import { getAvatarUrl } from "@/utils/get-avatar";

export async function hydrateBlocked() {
  const list = document.getElementById("muted-list") as HTMLUListElement;
  if (!list) return;

  const blocked = await getBlockedUsers();

  if (!blocked.length) {
    list.innerHTML = `<li class="text-white text-center">No blocked users found.</li>`;
    return;
  }

  list.innerHTML = "";

  for (const userId of blocked) {
    const user = await getUserById(userId);
    if (!user) return;

    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between gap-4 py-2 border-b border-white/10";

    const avatar = document.createElement("img");
    avatar.src = getAvatarUrl(user);
    avatar.alt = `${user.username}'s avatar`;
    avatar.className = "w-10 h-10 rounded-full";

    const name = document.createElement("span");
    name.className = "text-white font-semibold normal-case";
    name.textContent = user.username;

    const left = document.createElement("div");
    left.className = "flex items-center gap-4";
    left.appendChild(avatar);
    left.appendChild(name);

    const btn = document.createElement("button");
    btn.className =
      "px-4 py-1.5 text-sm font-semibold rounded-md bg-pong-error hover:bg-red-700 text-white transition";
    btn.textContent = "Unmute";

    li.appendChild(left);
    li.appendChild(btn);
    list.appendChild(li);
  }
}
