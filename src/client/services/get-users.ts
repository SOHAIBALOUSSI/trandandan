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
    return data.data.profiles;
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
}

export function addFriend(id: number) {
  const addBtn = document.getElementById(
    `add-friend-btn-${id}`
  ) as HTMLButtonElement;
  if (!addBtn) return;

  console.log(addBtn);

  addBtn.addEventListener("click", async (e: Event) => {
    e.preventDefault();

    try {
      const res = await fetch("/profile/request", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresseeId: id }),
      });

      const data = await res.json();
      if (data.ok) {
        console.log(data);
      } else {
        const msg = "Error sending friend request";
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function acceptFriend(id: number) {
  const acceptBtn = document.getElementById(
    `accept-friend-btn-${id}`
  ) as HTMLButtonElement;
  if (!acceptBtn) return;

  console.log(acceptBtn);

  acceptBtn.addEventListener("click", async (e: Event) => {
    e.preventDefault();

    try {
      const res = await fetch("/profile/accept", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requesterId: id }),
      });

      const data = await res.json();
      if (data.ok) {
        console.log(data);
      } else {
        const msg = "Error accept friend request";
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function rejectFriend(id: number) {
  const rejectBtn = document.getElementById(
    `reject-friend-btn-${id}`
  ) as HTMLButtonElement;
  if (!rejectBtn) return;

  console.log(rejectBtn);

  rejectBtn.addEventListener("click", async (e: Event) => {
    e.preventDefault();

    try {
      const res = await fetch("/profile/reject", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requesterId: id }),
      });

      const data = await res.json();
      if (data.ok) {
        console.log(data);
      } else {
        const msg = "Error accept friend request";
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  });
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

export async function listPendingRequests() {
  try {
    const res = await fetch("/profile/requests", {
      credentials: "include",
    });
    if (!res.ok) {
      console.error("Failed to fetch pending requests:", res.statusText);
      return [];
    }
    const data = await res.json();
    return data.data.requests;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function listFriends() {
  try {
    const res = await fetch("/profile/", {
      credentials: "include",
    });
    if (!res.ok) {
      console.log("Failed to fetch friend list", res.statusText);
      return [];
    }
    const data = await res.json();
    return data.data.friends;
  } catch (error) {
    console.log(error);
    return [];
  }
}
