import { acceptFriend } from "@/services/accept-friend";
import { rejectFriend } from "@/services/reject-friend";
import { getUserById } from "@/services/get-user-by-id";
import { styles } from "@/styles/styles";
import { getAvatarUrl } from "@/utils/get-avatar-url";
import { navigateTo } from "@/utils/navigate-to-link";
import { listPendingRequests } from "@/services/list-pending-requests";

export async function hydratePendingRequests() {
  const list = document.getElementById(
    "pending-requests-list"
  ) as HTMLUListElement;
  if (!list) return;

  const pending = await listPendingRequests();

  if (!pending.length) {
    list.innerHTML = `<li class="text-pong-dark-secondary text-center">No pending requests found.</li>`;
    return;
  }

  list.innerHTML = "";

  for (const requester_id of pending) {
    const user = await getUserById(requester_id);
    if (!user) return;

    const username = user.username;

    const li = document.createElement("li");
    li.className = `
        flex items-center justify-between gap-4 p-4 mb-3 
        bg-pong-dark-highlight/5 rounded-xl border border-pong-dark-highlight/30
        shadow-md hover:shadow-lg transition-all duration-300
        cursor-default
      `;

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

    const buttons = document.createElement("div");
    buttons.className = "flex flex-row items-center gap-4";

    const acceptBtn = document.createElement("button");
    acceptBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    acceptBtn.className =
      styles.darkPrimaryBtn + " bg-pong-success hover:!bg-green-600";
    acceptBtn.setAttribute(
      "aria-label",
      `Accept friend request from ${username}`
    );
    acceptBtn.onclick = async () => {
      const success = await acceptFriend(requester_id);
      if (success) li.remove();
    };

    const rejectBtn = document.createElement("button");
    rejectBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
    rejectBtn.className =
      styles.darkPrimaryBtn + " bg-pong-error hover:!bg-red-600";
    rejectBtn.setAttribute(
      "aria-label",
      `Reject friend request from ${username}`
    );
    rejectBtn.onclick = async () => {
      const success = await rejectFriend(requester_id);
      if (success) li.remove();
    };

    buttons.appendChild(acceptBtn);
    buttons.appendChild(rejectBtn);

    li.appendChild(left);
    li.appendChild(buttons);
    list.appendChild(li);
  }
}
