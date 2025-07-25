import { getFriends } from "@/services/get-friends";
import { getUserById } from "@/services/get-user-by-id";
import { navigateTo } from "@/utils/navigate-to-link";

export async function loadChatList() {
  const chatListElement = document.getElementById("chat-list");
  if (!chatListElement) return;

  chatListElement.innerHTML =
    '<li class="text-pong-dark-secondary text-center">Loading friends...</li>';

  const friendIds = await getFriends();

  if (!friendIds.length) {
    chatListElement.innerHTML =
      '<li class="text-pong-dark-secondary text-center">No friends found.</li>';
    return;
  }

  // Fetch profiles for all friends
  const profiles = await Promise.all(friendIds.map((id) => getUserById(id)));

  chatListElement.innerHTML = profiles
    .map((profile) => {
      if (!profile) return "";
      return `
      <li class="flex items-center justify-between border-b border-pong-dark-accent/30 px-4 py-3 shadow text-white">
        <div class="flex items-center gap-4">
          <img src="${profile.avatar_url}" alt="${profile.username}'s avatar" class="w-10 h-10 rounded-full border border-pong-accent object-cover" />
          <span class="font-semibold text-lg">${profile.username}</span>
        </div>
        <button
          class="bg-pong-accent hover:bg-pong-dark-accent text-white px-4 py-2 rounded-lg font-bold shadow transition"
          data-chat-id="${profile.id}"
        >
          Chat
        </button>
      </li>
      `;
    })
    .join("");

  Array.from(chatListElement.querySelectorAll("button[data-chat-id]")).forEach(
    (btn) => {
      btn.addEventListener("click", (e) => {
        const chatId = (e.currentTarget as HTMLButtonElement).getAttribute(
          "data-chat-id"
        );
        if (chatId) {
          navigateTo(`/lounge/${chatId}`);
        }
      });
    }
  );
}
