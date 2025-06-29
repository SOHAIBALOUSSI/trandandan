export async function getAllUsers() {
  try {
    const res = await fetch("/profile/all", {
      credentials: "include",
    });
    if (!res.ok) {
      console.error("Failed to fetch users:", res.statusText);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data.users) ? data.users : [];
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
}

export async function loadFriendsList() {
  const list = document.getElementById("friends-list");
  if (!list) return;

  list.innerHTML = `<li class="text-white text-center">Loading...</li>`;

  const users = await getAllUsers();

  if (!users.length) {
    list.innerHTML = `<li class="text-white text-center">No users found.</li>`;
    return;
  }

  list.innerHTML = users
    .map(
      (user: { id: string; username: string; avatar?: string }) => `
      <li class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img src="${user.avatar}" alt="${user.username}'s avatar" class="w-12 h-12 rounded-full" />
          <span class="text-lg font-semibold text-white">${user.username}</span>
        </div>
        <button class="bg-pong-accent hover:bg-pong-dark-accent text-white font-semibold px-4 py-2 rounded-md transition-all">
          Add Friend
        </button>
      </li>
    `
    )
    .join("");
}
