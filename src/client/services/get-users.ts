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
    return Array.isArray(data.data?.profiles) ? data.data.profiles : [];
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
}

export async function loadAllUsersList() {
  const list = document.getElementById("all-users-list");
  if (!list) return;

  list.innerHTML = `<li class="text-white text-center">Loader...</li>`;

  const users = await getAllUsers();

  if (!users.length) {
    list.innerHTML = `<li class="text-white text-center">No users found.</li>`;
    return;
  }

  list.innerHTML = users
    .map(
      (user: { userId: number; username: string }) => `
      <li class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <span class="text-lg font-semibold text-white normal-case">${user.username}</span>
        </div>
        <button class="bg-pong-accent hover:bg-pong-dark-accent text-white font-semibold px-4 py-2 rounded-md transition-all" id="add-friend-btn-${user.userId}">
          Add Friend
        </button>
      </li>
    `
    )
    .join("");
}
