import { TopBar } from "@/components/layout/TopBar";
import { styles } from "@/styles/styles";
import { startChatListener, sendChatMessage } from "@/services/chat-service";
import { getCurrentUser } from "@/utils/user-store";
import { MessageSent } from "types/types";
import { getUserById } from "@/services/get-user-by-id";
import { Loader } from "@/components/common/Loader";
import { ChatBlock } from "@/components/chat/ChatBlock";
import { NavBar } from "@/components/layout/NavBar";
import { inviteFriend } from "@/services/invite-friend";

export async function Chat(friendId: number) {
  const friend = await getUserById(friendId);
  const currentUser = getCurrentUser();

  if (!friend) {
    const section = document.createElement("section");
    section.className = styles.pageLayoutDark;
    section.appendChild(TopBar());
    section.appendChild(
      Loader({ text: "Unable to load chat. Please try again later." })
    );
    return section;
  }

  if (!currentUser) {
    const section = document.createElement("section");
    section.className = styles.pageLayoutDark;
    section.appendChild(TopBar());
    section.appendChild(Loader({ text: "Preparing your club profile..." }));
    return section;
  }

  const section = document.createElement("section");
  section.className = styles.pageLayoutDark;
  section.appendChild(NavBar());

  const container = document.createElement("div");
  container.className = "w-full relative";
  container.appendChild(TopBar());

  const main = document.createElement("main");
  main.className =
    "px-0 md:px-16 pt-16 md:pt-24 md:pb-12 h-[100vh] md:h-[calc(100vh-2rem)] overflow-y-auto flex flex-col items-center gap-6";
  main.appendChild(ChatBlock(friend));

  container.appendChild(main);
  section.appendChild(container);

  const chatMessages = section.querySelector(
    "#chat-messages"
  ) as HTMLDivElement;
  const chatForm = section.querySelector("#chat-input-form") as HTMLFormElement;
  const chatInput = section.querySelector("#chat-input") as HTMLInputElement;
  const messages: MessageSent[] = [];

  if (!chatMessages || !chatForm || !chatInput) return section;

  function renderMessages() {
    chatMessages.innerHTML = "";
    const last = messages.slice(-50);
    last.forEach((msg) => {
      const isMe = msg.sender_id === currentUser?.id;
      const msgDiv = document.createElement("div");
      msgDiv.className = `flex flex-col ${isMe ? "items-end" : "items-start"}`;
      msgDiv.innerHTML = `
        <span class="${
          isMe ? "bg-pong-dark-primary" : "bg-[#BFBEAE]"
        } text-black px-4 py-2 rounded-lg shadow-sm max-w-[70%] normal-case placeholder:capitalize">${
        msg.content
      }</span>
        <span class="normal-case text-xs text-pong-highlight ${
          isMe ? "mr-2" : "ml-2"
        } mt-1">
          ${isMe ? "You" : friend?.username} • ${new Date().toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )} 
        </span>
      `;
      chatMessages.appendChild(msgDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  startChatListener((msg: MessageSent) => {
    if (
      (msg.sender_id === currentUser.id && msg.recipient_id === friend.id) ||
      (msg.sender_id === friend.id && msg.recipient_id === currentUser.id)
    ) {
      messages.push(msg);
      renderMessages();
    }
  });

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = chatInput.value.trim();
    if (!content) return;
    sendChatMessage({
      type: "MESSAGE_SENT",
      sender_id: currentUser.id,
      recipient_id: friend.id,
      content,
    } as any);
    messages.push({
      type: "MESSAGE_SENT",
      sender_id: currentUser.id,
      recipient_id: friend.id,
      content,
      message_id: -1,
    });
    renderMessages();
    chatInput.value = "";
  });

  const challengeBtn = section.querySelector(
    "#challenge-button"
  ) as HTMLButtonElement;
  if (challengeBtn) {
    challengeBtn.addEventListener("click", async () => {
      challengeBtn.disabled = true;
      await inviteFriend(friend.id);
      setTimeout(() => {
        challengeBtn.disabled = false;
      }, 3000);
    });
  }

  return section;
}
