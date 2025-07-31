import { UserProfile } from "types/types";
import { styles } from "@/styles/styles";
import { getAllUsers } from "@/services/get-all-users";
import { sendFriendRequest } from "@/services/send-friend-request";
import { getAvatarUrl } from "@/utils/get-avatar-url";
import { getFriends } from "@/services/get-friends";
import { navigateTo } from "@/utils/navigate-to-link";
import { cancelFriendRequest } from "@/services/cancel-friend-request";

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
      li.className = `
        flex items-center justify-between gap-4 p-4 mb-3 
        bg-pong-dark-highlight/5 rounded-xl border border-pong-dark-highlight/30
        shadow-md hover:shadow-lg transition-all duration-300
        cursor-default
      `;

      const left = document.createElement("div");
      left.className = "flex items-center gap-4 cursor-pointer";
      left.onclick = () => navigateTo(`/members/${user.id}`);

      const avatar = document.createElement("img");
      avatar.src = getAvatarUrl(user);
      avatar.alt = `${user.username}'s avatar`;
      avatar.className =
        "w-12 h-12 rounded-full object-cover ring-2 ring-pong-accent/40";

      const name = document.createElement("span");
      name.className =
        "text-lg font-semibold text-white normal-case hover:underline";
      name.textContent = user.username;

      left.appendChild(avatar);
      left.appendChild(name);

      const addBtn = document.createElement("button");
      addBtn.className = styles.darkPrimaryBtn;
      addBtn.setAttribute("aria-label", "Send friend request");
      addBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i>`;

      let requestSent = false;

      addBtn.onclick = async (e) => {
        e.stopPropagation();
        addBtn.disabled = true;

        if (!requestSent) {
          await sendFriendRequest(user.id);
          requestSent = true;
          addBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
          addBtn.className =
            styles.darkPrimaryBtn +
            " bg-transparent border border-pong-dark-primary/40 hover:bg-pong-dark-highlight/20";
          addBtn.setAttribute("aria-label", "Cancel friend request");
        } else {
          await cancelFriendRequest(user.id);
          requestSent = false;
          addBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i>`;
          addBtn.className = styles.darkPrimaryBtn;
          addBtn.setAttribute("aria-label", "Send friend request");
        }

        setTimeout(() => {
          addBtn.disabled = false;
        }, 500);
      };

      li.appendChild(left);
      li.appendChild(addBtn);
      list.appendChild(li);
    }
  });
}
