import { getFriends } from "@/services/get-friends";
import { getUserById } from "@/services/get-user-by-id";
import { removeFriend } from "@/services/remove-friend";
import { styles } from "@/styles/styles";
import { getAvatarUrl } from "@/utils/get-avatar";
import { navigateTo } from "@/utils/navigate-to-link";

export async function hydrateFriends() {
  const list = document.getElementById("friends-list") as HTMLUListElement;
  if (!list) return;

  const friends = await getFriends();

  if (!friends.length) {
    list.innerHTML = `<li class="text-pong-dark-secondary text-center">No friends found.</li>`;
    return;
  }

  list.innerHTML = "";

  for (const friend_id of friends) {
    const user = await getUserById(friend_id);
    if (!user) return;

    const li = document.createElement("li");
    li.className = styles.listStyle + " items-center justify-between gap-4";

    const avatar = document.createElement("img");
    avatar.src = getAvatarUrl(user);
    avatar.alt = `${user.username}'s avatar`;
    avatar.className = "w-8 h-8 md:w-10 md:h-10 rounded-full";

    const name = document.createElement("span");
    name.className = "text-lg font-semibold text-white normal-case";
    name.textContent = user.username;

    const left = document.createElement("div");
    left.className = "flex items-center gap-4 cursor-pointer";
    left.onclick = () => {
      navigateTo(`/members/${user.id}`);
    };
    left.appendChild(avatar);
    left.appendChild(name);

    const unfriendBtn = document.createElement("button");
    unfriendBtn.className = styles.darkPrimaryBtn;
    unfriendBtn.innerHTML = `<i class="fa-solid fa-user-minus"></i>`;
    unfriendBtn.onclick = async () => {
      unfriendBtn.disabled = true;
      await removeFriend(user.id);
    };

    li.appendChild(left);
    li.appendChild(unfriendBtn);
    list.appendChild(li);
  }
}
