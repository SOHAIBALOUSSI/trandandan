import { UserProfile } from "types/types";
import { styles } from "@/styles/styles";
import { getAllUsers } from "@/services/get-users";
import { sendFriendRequest } from "@/services/send-friend-request";
import { getAvatarUrl } from "@/utils/get-avatar";

export async function hydrateAllMembers(currentUser: UserProfile) {
  const list = document.getElementById("all-members-list") as HTMLUListElement;
  if (!list) return;

  const users = await getAllUsers();

  if (!users.length || users.length === 1) {
    list.innerHTML = `<li class="text-white text-center mt-4">No members found.</li>`;
    return;
  }

  list.innerHTML = "";

  users.forEach((user: UserProfile) => {
    if (user.id !== currentUser.id) {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between gap-4 p-3 rounded-md";

      const avatar = document.createElement("img");
      avatar.src = getAvatarUrl(user);
      avatar.alt = `${user.username}'s avatar`;
      avatar.className =
        "w-10 h-10 rounded-full object-cover border border-pong-accent/30 bg-gray-700";

      const name = document.createElement("span");
      name.className = "text-lg font-semibold text-white normal-case";
      name.textContent = user.username;

      const btn = document.createElement("button");
      btn.className = styles.darkPrimaryBtn;
      btn.textContent = "Add Friend";
      btn.onclick = () => {
        btn.disabled = true;
        btn.textContent = "Request Sent";
        btn.style.backgroundColor = "#4a5568";
        sendFriendRequest(user.id);
      };

      const left = document.createElement("div");
      left.className = "flex items-center space-x-4";
      left.appendChild(avatar);
      left.appendChild(name);

      li.appendChild(left);
      li.appendChild(btn);
      list.appendChild(li);
    }
  });
}
