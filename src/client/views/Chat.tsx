import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import { styles } from "@/styles/styles";
import { fontSizes } from "@/styles/fontSizes";
import { startChatListener, sendChatMessage } from "@/handlers/chat";
import { getCurrentUser } from "@/utils/user-store";
import { MessageSent } from "types/types";
import { getUserById } from "@/services/get-user-by-id";

export async function Chat(friendId: number) {
  const friend = await getUserById(friendId);
  if (!friend) {
    const div = document.createElement("div");
    div.className = "text-center text-white";
    div.textContent = "Unable to load chat. Please try again later.";
    return div;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    const div = document.createElement("div");
    div.className = "text-center text-white";
    div.textContent = "Please log in to access the chat.";
    return div;
  }

  const messages: MessageSent[] = [];

  const section = document.createElement("section");
  section.className = styles.pageLayoutDark;

  section.innerHTML = `
    ${NavBar().outerHTML}
    <div class="w-full relative">
      ${TopBar().outerHTML}
      <main class="${styles.pageContent}">
        ${
          SecondaryHeader({
            title: "Lounge Conversations",
            subtitle: "Chat with fellow club champions",
          }).outerHTML
        }
        <div class="relative flex flex-col gap-6 w-full max-w-3xl bg-pong-dark-custom md:p-10 h-[60vh] md:h-[70vh] bg-pong-dark-bg/90 backdrop-blur-lg border border-pong-secondary/30 rounded-xl shadow-inner p-4">
          <div class="sticky top-0 z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-md border border-white/10 shadow-md">
            <img src="${friend.avatar_url}" alt="Friend avatar"
              class="w-12 h-12 rounded-full object-cover border-2 border-pong-accent shadow" />
            <div>
              <h3 class="text-lg font-bold text-pong-accent">${
                friend.username
              }</h3>
              <div class="flex gap-2 mt-1">
                <span class="bg-pong-highlight/20 text-pong-highlight px-3 py-1 rounded-full text-xs font-semibold">${
                  friend.level
                }</span>
                <span class="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">${
                  friend.rank
                }</span>
              </div>
            </div>
            <div class="justify-self-end flex-1 text-right">
              <button class="${styles.darkPrimaryBtn}">
                <i class="fa-solid fa-table-tennis-paddle-ball"></i>
              </button>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto space-y-6 pr-1 scroll-smooth" id="chat-messages"></div>
          <form class="flex items-center gap-2 mt-4 px-2 ${
            fontSizes.smallTextFontSize
          }" id="chat-input-form">
            <input type="text" placeholder="Type your message..." class="flex-1 rounded-lg px-4 py-2 bg-white/10 text-white focus:outline-none placeholder:text-white/50 caret-pong-accent" id="chat-input" />
            <button type="submit" class="bg-pong-accent hover:bg-pong-dark-accent text-white font-bold px-5 py-2 rounded-lg transition capitalize">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
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
      msgDiv.className = `flex flex-col items-${isMe ? "end" : "start"}`;
      msgDiv.innerHTML = `
        <span class="${
          isMe ? "bg-pong-secondary/90" : "bg-pong-dark-secondary/90"
        } text-black px-4 py-2 rounded-lg shadow-sm max-w-[70%]">${
        msg.content
      }</span>
        <span class="text-xs text-pong-highlight ${
          isMe ? "mr-2" : "ml-2"
        } mt-1">
          ${isMe ? "You" : friend?.username} • #${msg.message_id ?? ""} 
        </span>
      `;
      chatMessages.appendChild(msgDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  startChatListener((msg: MessageSent) => {
    if (
      msg.type === "MESSAGE_SENT" &&
      ((msg.sender_id === currentUser?.id && msg.recipient_id === friend.id) ||
        (msg.sender_id === friend.id && msg.recipient_id === currentUser?.id))
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
      sender_id: currentUser?.id,
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
