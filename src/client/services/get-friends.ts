import { UserProfile } from "types/types";
import MaleAvatar from "@/assets/default-male-avatar.png";
import FemaleAvatar from "@/assets/default-female-avatar.png";

export async function getAllFriends(): Promise<number[]> {
  try {
    const res = await fetch("/friends/", {
      credentials: "include",
    });

    if (!res.ok) return [];

    const data = await res.json();
    const friendIds = data.data.friends.map(
      (f: { friend_id: number }) => f.friend_id
    );
    return friendIds;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function hydrateFriends() {
  const list = document.getElementById("friend-list") as HTMLUListElement;
  if (!list) return;

  const friends = await getAllFriends();
  console.log(friends);

  if (!friends.length) {
    list.innerHTML = `<li class="text-white text-center">No friends found.</li>`;
    return;
  }

  list.innerHTML = "";

  friends.forEach((friend_id: number) => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between gap-4 py-2";

    // const avatar = document.createElement("img");
    // avatar.src = user.avatar_url
    //   ? user.avatar_url
    //   : user.gender === "M"
    //   ? (user.avatar_url = MaleAvatar)
    //   : FemaleAvatar;
    // avatar.alt = `${user.username}'s avatar`;
    // avatar.className =
    //   "w-10 h-10 rounded-full object-cover border border-pong-accent/30 bg-gray-700";

    const name = document.createElement("span");
    name.className = "text-lg font-semibold text-white normal-case";
    name.textContent = `friend number ${friend_id}`;

    const left = document.createElement("div");
    left.className = "flex items-center space-x-4";
    left.appendChild(name);

    li.appendChild(left);
    list.appendChild(li);
  });
}
