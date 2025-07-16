import { acceptFriend } from "@/services/accept-friend";
import { rejectFriend } from "@/services/reject-friend";
import { getUserById } from "@/services/get-user-by-id";
import { styles } from "@/styles/styles";
import { getAvatarUrl } from "@/utils/get-avatar";
import { navigateTo } from "@/utils/navigate-to-link";

export async function listPendingRequests() {
  try {
    const res = await fetch("/friends/requests", {
      credentials: "include",
    });

    if (!res.ok) return [];

    const data = await res.json();
    const requesterIds = data.data.requests.map(
      (r: { requester_id: number }) => r.requester_id
    );
    return requesterIds;
  } catch (err) {
    return [];
  }
}

export async function handlePendingRequests() {
  const list = document.getElementById(
    "pending-requests-list"
  ) as HTMLUListElement;
  if (!list) return;

  const pending = await listPendingRequests();

  if (!pending.length) {
    list.innerHTML = `<li class="text-white text-center">No pending requests found.</li>`;
    return;
  }

  list.innerHTML = "";

  for (const requester_id of pending) {
    const user = await getUserById(requester_id);
    if (!user) return;

    const username = user.username;

    const li = document.createElement("li");
    li.className =
      "flex flex-wrap items-center justify-between gap-4 py-2 border-b border-white/10";

    const avatar = document.createElement("img");
    avatar.src = getAvatarUrl(user);
    avatar.alt = `${user.username}'s avatar`;
    avatar.className = "w-10 h-10 rounded-full";

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
    acceptBtn.textContent = "Accept";
    acceptBtn.className =
      "font-semibold capitalize bg-pong-success hover:bg-green-600 text-white px-4 py-1.5 rounded shadow transition focus:outline-none active:scale-[0.98]";
    acceptBtn.setAttribute(
      "aria-label",
      `Accept friend request from ${username}`
    );
    acceptBtn.onclick = async () => {
      const success = await acceptFriend(requester_id);
      if (success) li.remove();
    };

    const rejectBtn = document.createElement("button");
    rejectBtn.textContent = "Reject";
    rejectBtn.className =
      "font-semibold capitalize bg-pong-error hover:bg-red-600 text-white px-4 py-1.5 rounded shadow transition focus:outline-none active:scale-[0.98]";
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
