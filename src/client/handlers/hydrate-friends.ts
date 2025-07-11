import { getAllFriends } from "@/services/get-friends";
import { getUserById } from "@/services/get-user-by-id";
import { removeFriend } from "@/services/remove-friend";
import { styles } from "@/styles/styles";
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
    li.className =
      "flex items-center justify-between gap-4 py-2 border-b border-white/10";

    const avatar = document.createElement("img");
    avatar.src = getAvatarUrl(user);
    avatar.alt = `${user.username}'s avatar`;
    avatar.className =
      "w-10 h-10 rounded-full object-cover border border-pong-accent/30 bg-gray-700";

    const name = document.createElement("span");
    name.className = "text-lg font-semibold text-white normal-case";
    name.textContent = user.username;

    const left = document.createElement("div");
    left.className = "flex items-center gap-4";
    left.appendChild(avatar);
    left.appendChild(name);

    const unfriendBtn = document.createElement("button");
    unfriendBtn.className = styles.darkPrimaryBtn;
    unfriendBtn.textContent = "Unfriend";
    unfriendBtn.onclick = async () => {
      unfriendBtn.disabled = true;
      unfriendBtn.textContent = "Unfriending...";
      unfriendBtn.style.backgroundColor = "#4a5568";
      await removeFriend(user.id);
    };

    li.appendChild(left);
    li.appendChild(unfriendBtn);
    list.appendChild(li);
  }
}
