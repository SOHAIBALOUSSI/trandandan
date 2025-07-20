import { getBlockedUsers } from "@/services/get-blocked";
import { getUserById } from "@/services/get-user-by-id";
import { unblockFriend } from "@/services/unblock-friend";
import { getAvatarUrl } from "@/utils/get-avatar";
import { styles } from "@/styles/styles";

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
      "flex items-center justify-between p-4 md:p-5 rounded-xl bg-pong-sport-bg-light/40 dark:bg-pong-dark-bg/70 shadow-sm border border-pong-sport-accent/10 hover:shadow-md transition-all";

    const avatar = document.createElement("img");
    avatar.src = getAvatarUrl(user);
    avatar.alt = `${user.username}'s avatar`;
    avatar.className = "w-8 h-8 md:w-10 md:h-10 rounded-full";

    const name = document.createElement("span");
    name.className = "text-lg font-semibold text-white normal-case";
    name.textContent = user.username;

    const left = document.createElement("div");
    left.className = "flex items-center gap-4";
    left.appendChild(avatar);
    left.appendChild(name);

    const unmuteBtn = document.createElement("button");
    unmuteBtn.className = styles.darkPrimaryBtn;
    unmuteBtn.textContent = "Unmute";
    unmuteBtn.onclick = async () => {
      unmuteBtn.disabled = true;
      unmuteBtn.textContent = "Unmuting...";
      unmuteBtn.style.backgroundColor = "#4a5568";
      const success = await unblockFriend(user.id);
      if (success) {
        li.remove();
      }
    };

    li.appendChild(left);
    li.appendChild(unmuteBtn);
    list.appendChild(li);
  }
}
