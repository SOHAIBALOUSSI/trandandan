import { acceptFriend } from "@/services/accept-friend";
import { rejectFriend } from "@/services/reject-friend";
import { styles } from "@/styles/styles";

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
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function handlePendingRequests() {
  const list = document.getElementById(
    "pending-requests-list"
  ) as HTMLUListElement;
  if (!list) return;

  list.innerHTML = `<li class="text-white text-center">Loading pending requests...</li>`;

  const pending = await listPendingRequests();
  list.replaceChildren();

  if (!pending.length) {
    list.innerHTML = `<li class="text-white text-center">No pending friend requests found.</li>`;
    return;
  }

  for (const requester_id of pending) {
    // const user = await getUserById(requester_id);
    const username = "username"; // replace later with user.username

    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between gap-4 py-2 border-b border-white/10";

    const left = document.createElement("div");
    left.className = "flex items-center space-x-4";
    const name = document.createElement("span");
    name.className = "text-white font-semibold text-base";
    name.textContent = username;
    left.appendChild(name);

    const buttons = document.createElement("div");
    buttons.className = "flex flex-row items-center gap-4";

    const acceptBtn = document.createElement("button");
    acceptBtn.textContent = "Accept";
    acceptBtn.className =
      "bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded shadow transition";
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
      "bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded shadow transition";
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
