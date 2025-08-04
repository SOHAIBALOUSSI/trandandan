import { UserProfile } from "types/types";
import { styles } from "@/styles/styles";
import { getAllUsers } from "@/services/get-all-users";
import { sendFriendRequest } from "@/services/send-friend-request";
import { getAvatarUrl } from "@/utils/get-avatar-url";
import { getFriends } from "@/services/get-friends";
import { navigateTo } from "@/utils/navigate-to-link";
import { cancelFriendRequest } from "@/services/cancel-friend-request";
import { getWelcomeTitle } from "@/components/home/Hero";
import { getUserTitle } from "@/utils/get-user-title";
import { fontSizes } from "@/styles/fontSizes";

export async function hydrateAllMembers(currentUser: UserProfile) {
  const list = document.getElementById("all-members-list") as HTMLUListElement;
  if (!list) return;

  const users = await getAllUsers();
  const friends = await getFriends();

  if (!users.length || users.length === 1) {
    list.innerHTML = `<li class="text-pong-dark-secondary text-center py-2 text-sm md:text-lg">No members found.</li>`;
    return;
  }

  list.innerHTML = "";

  users.forEach((user: UserProfile) => {
    if (user.id !== currentUser.id && !friends.includes(user.id)) {
      const li = document.createElement("li");
      li.className = styles.friendsListItemStyle;

      const left = document.createElement("div");
      left.className = "flex items-center gap-4 cursor-pointer group";
      left.onclick = () => navigateTo(`/members/${user.id}`);

      const avatar = document.createElement("img");
      avatar.src = getAvatarUrl(user);
      avatar.alt = `${user.username}'s avatar`;
      avatar.className = styles.friendsAvatarStyle;

      const nameWrapper = document.createElement("div");
      nameWrapper.className = "flex flex-col";

      const name = document.createElement("span");
      name.className = `${fontSizes.bodyFontSize} font-semibold text-white normal-case group-hover:underline`;
      name.textContent = `${getWelcomeTitle(user)} ${user.username}`;

      const subtitle = document.createElement("span");
      subtitle.className = "text-xs md:text-sm text-pong-dark-secondary";
      subtitle.textContent = getUserTitle(user.rank);

      nameWrapper.appendChild(name);
      nameWrapper.appendChild(subtitle);

      left.appendChild(avatar);
      left.appendChild(nameWrapper);

      const addBtn = document.createElement("button");
      addBtn.className =
        "p-2 rounded-full hover:bg-pong-dark-highlight/20 transition-all duration-200 text-pong-dark-primary hover:text-pong-accent";
      addBtn.setAttribute("aria-label", "Send friend request");
      addBtn.innerHTML = `<i class="fa-solid fa-user-plus text-base md:text-lg"></i>`;

      let requestSent = false;

      addBtn.onclick = async (e) => {
        e.stopPropagation();
        addBtn.disabled = true;

        if (!requestSent) {
          await sendFriendRequest(user.id);
          requestSent = true;
          addBtn.innerHTML = `<i class="fa-solid fa-circle-xmark text-base md:text-lg"></i>`;
          addBtn.className =
            "p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-all duration-200";
          addBtn.setAttribute("aria-label", "Cancel friend request");
        } else {
          await cancelFriendRequest(user.id);
          requestSent = false;
          addBtn.innerHTML = `<i class="fa-solid fa-user-plus text-base md:text-lg"></i>`;
          addBtn.className =
            "p-2 rounded-full hover:bg-pong-dark-highlight/20 transition-all duration-200 text-pong-dark-primary hover:text-pong-accent";
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
