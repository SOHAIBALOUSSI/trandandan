import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { startChatListener, sendChatMessage } from "@/handlers/chat";
import { getCurrentUser } from "@/utils/user-store";
import { MessageSent } from "types/types";
import { getUserById } from "@/services/get-user-by-id";
import { Loader } from "@/components/common/Loader";
import { ChatBlock } from "@/components/chat/ChatBlock";

export async function Chat(friendId: number) {
  const friend = await getUserById(friendId);
  if (!friend) {
    const section = document.createElement("section");
    section.className = styles.pageLayoutDark;
    section.innerHTML = `
	  ${NavBar().outerHTML}
	  <div class="w-full relative">
	    ${TopBar().outerHTML}
	    ${
        Loader({ text: "Unable to load chat. Please try again later." })
          .outerHTML
      }
	  </div>
	`;
    return section;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    const section = document.createElement("section");
    section.className = styles.pageLayoutDark;
    section.innerHTML = `
	  ${NavBar().outerHTML}
	  <div class="w-full relative">
	    ${TopBar().outerHTML}
	    ${Loader({ text: "Preparing your club profile..." }).outerHTML}
	  </div>
	`;
    return section;
  }

  const messages: MessageSent[] = [];

  const section = document.createElement("section");
  section.className = styles.pageLayoutDark;

  section.innerHTML = `
    ${NavBar().outerHTML}
    <div class="w-full relative">
      ${TopBar().outerHTML}
      <main class="px-0 md:px-16 pt-16 md:pt-24 md:pb-12 h-[100vh] md:h-[calc(100vh-2rem)] overflow-y-auto flex flex-col items-center gap-6">
        ${ChatBlock(friend).outerHTML}
      </main>
    </div>
  `;

  const chatMessages = section.querySelector(
    "#chat-messages"
  ) as HTMLDivElement;
  const chatForm = section.querySelector("#chat-input-form") as HTMLFormElement;
  const chatInput = section.querySelector("#chat-input") as HTMLInputElement;

  if (!chatMessages || !chatForm || !chatInput) return section;

  function renderMessages() {
    chatMessages.innerHTML = "";
    messages.forEach((msg) => {
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
    console.log("start");
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

  return section;
}
