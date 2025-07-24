import { UserProfile } from "types/types";
import { styles } from "@/styles/styles";
import { getAllUsers } from "@/services/get-all-users";
import { sendFriendRequest } from "@/services/send-friend-request";
import { getAvatarUrl } from "@/utils/get-avatar-url";
import { getFriends } from "@/services/get-friends";
import { navigateTo } from "@/utils/navigate-to-link";

export async function hydrateAllMembers(currentUser: UserProfile) {
  const list = document.getElementById("all-members-list") as HTMLUListElement;
  if (!list) return;

  const users = await getAllUsers();
  const friends = await getFriends();

  if (!users.length || users.length === 1) {
    list.innerHTML = `<li class="text-pong-dark-secondary text-center">No members found.</li>`;
    return;
  }

  list.innerHTML = "";

  users.forEach((user: UserProfile) => {
    if (user.id !== currentUser.id && !friends.includes(user.id)) {
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
      left.appendChild(avatar);
      left.appendChild(name);
      left.onclick = () => {
        navigateTo(`/members/${user.id}`);
      };

      const addBtn = document.createElement("button");
      addBtn.className = styles.darkPrimaryBtn;
      addBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i>`;
      addBtn.onclick = () => {
        addBtn.disabled = true;
        addBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        addBtn.style.backgroundColor = "#4a5568";
        sendFriendRequest(user.id);
      };

      li.appendChild(left);
      li.appendChild(addBtn);
      list.appendChild(li);
    }
  });
}
