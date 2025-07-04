import { UserProfile } from "types/types";
import MaleAvatar from "@/assets/default-male-avatar.png";
import FemaleAvatar from "@/assets/default-female-avatar.png";
import { styles } from "@/styles/styles";

async function getAllUsers() {
  try {
    const res = await fetch("/profile/all", {
      credentials: "include",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.data.profiles;
  } catch (err) {
    console.error("Error fetching all users:", err);
    return [];
  }
}

function sendFriendRequest(id: number) {
  fetch("/friends/request", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ addresseeId: id }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        console.error("Friend request failed:", data);
      } else {
        console.log("Friend request sent:", data);
      }
    })
    .catch((err) => console.error("Error:", err));
}

export async function hydrateAllMembers(currentUser: UserProfile) {
  const list = document.getElementById("all-users-list") as HTMLUListElement;
  if (!list) return;

  const users = await getAllUsers();

  if (!users.length) {
    list.innerHTML = `<li class="text-white text-center">No users found.</li>`;
    return;
  }

  list.innerHTML = "";

  users.forEach((user: UserProfile) => {
    if (user.id !== currentUser.id) {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between gap-4 p-3 rounded-md";

      const avatar = document.createElement("img");
      avatar.src = user.avatar_url
        ? user.avatar_url
        : user.gender === "M"
        ? (user.avatar_url = MaleAvatar)
        : FemaleAvatar;
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
