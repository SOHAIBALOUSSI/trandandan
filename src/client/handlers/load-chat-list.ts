export function loadChatList() {
  const chatListElement = document.getElementById("chat-list");
  if (!chatListElement) return;

  setTimeout(() => {
    const chats = [
      { id: 1, name: "Sopu", lastMessage: "logtime from 2025-07-28" },
      { id: 2, name: "Bijou", lastMessage: "come to bocal please" },
      { id: 3, name: "Tesla", lastMessage: "khwiw c4 for exam" },
    ];

    if (chatListElement) {
      chatListElement.innerHTML = chats
        .map(
          (chat) => `
		<li class="text-white">
		  <strong>${chat.name}</strong>: ${chat.lastMessage}
		</li>
	  `
        )
        .join("");
    }
  }, 1000);
}
