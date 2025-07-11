import { getAllFriends } from "@/services/get-friends";
import { getUserById } from "@/services/get-user-by-id";
import { getAvatarUrl } from "@/utils/get-avatar";

export async function hydrateFriends() {
  const list = document.getElementById("friends-list") as HTMLUListElement;
  if (!list) return;

  const friends = await getAllFriends();

  if (!friends.length) {
    list.innerHTML = `<li class="text-white text-center">No friends found.</li>`;
    return;
  }

  list.innerHTML = "";

  for (const friend_id of friends) {
    const user = await getUserById(friend_id);
    if (!user) return;

    const li = document.createElement("li");
    li.className = "flex items-center justify-between gap-4 py-2";

    const avatar = document.createElement("img");
    avatar.src = getAvatarUrl(user);
    avatar.alt = `${user.username}'s avatar`;
    avatar.className =
      "w-10 h-10 rounded-full object-cover border border-pong-accent/30 bg-gray-700";

    const name = document.createElement("span");
    name.className = "text-lg font-semibold text-white normal-case";
    name.textContent = user.username;

    const left = document.createElement("div");
    left.className = "flex items-center space-x-4";
    left.appendChild(avatar);
    left.appendChild(name);

    li.appendChild(left);
    list.appendChild(li);
  }
}
