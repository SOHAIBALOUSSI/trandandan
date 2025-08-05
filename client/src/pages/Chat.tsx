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
import { getFriends } from "@/services/get-friends";
import { navigateTo } from "@/utils/navigate-to-link";

export async function Chat(friendId: number) {
  const friend = await getUserById(friendId);
  const currentUser = getCurrentUser();

  const section = document.createElement("section");
  section.className = styles.pageLayoutDark;

  if (!friend || !currentUser) {
    section.appendChild(TopBar());
    section.appendChild(
      Loader({
        text: friend
          ? "Preparing your club profile..."
          : "Unable to load chat. Please try again later.",
      })
    );
    return section;
  }

  section.appendChild(NavBar());

  const container = document.createElement("div");
  container.className = "w-full relative flex";

  const friendsSidebar = document.createElement("aside");
  friendsSidebar.className =
    "hidden md:flex flex-col w-56 min-w-44 max-w-xs bg-pong-dark-custom border-l border-pong-dark-accent/30 h-[calc(100vh-4rem)] overflow-y-auto py-4 px-2 gap-2 mt-16";

  (async () => {
    const friendIds = await getFriends();
    for (const id of friendIds) {
      const user = await getUserById(id);
      if (!user) continue;
      const friendBtn = document.createElement("button");
      friendBtn.className =
        "flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-pong-dark-accent/20 transition-colors";
      friendBtn.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.username}" class="w-8 h-8 rounded-full object-cover" />
        <span class="text-white font-medium">${user.username}</span>
      `;
      friendBtn.onclick = () => {
        navigateTo(`/lounge/${user.id}`);
      };
      friendsSidebar.appendChild(friendBtn);
    }
  })();

  const mainArea = document.createElement("div");
  mainArea.className = "flex-1 flex flex-col";

  mainArea.appendChild(TopBar());

  const main = document.createElement("main");
  main.className =
    "px-0 md:px-16 pt-16 md:pt-24 md:pb-12 h-[100vh] md:h-[calc(100vh-2rem)] overflow-y-auto flex flex-col items-center gap-6";

  const loadingDiv = document.createElement("div");
  loadingDiv.className = "text-white py-10 text-lg font-semibold";
  loadingDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i>Loading messages...`;
  main.appendChild(loadingDiv);

  mainArea.appendChild(main);

  container.appendChild(mainArea);
  container.appendChild(friendsSidebar);
  section.appendChild(container);

  const messages: MessageSent[] = [];

  setTimeout(() => {
    main.removeChild(loadingDiv);
    const chatBlock = ChatBlock(friend);
    main.appendChild(chatBlock);

    const chatMessages = section.querySelector(
      "#chat-messages"
    ) as HTMLDivElement;
    const chatForm = section.querySelector(
      "#chat-input-form"
    ) as HTMLFormElement;
    const chatInput = section.querySelector("#chat-input") as HTMLInputElement;

    function renderMessages() {
      if (!chatMessages) return;
      chatMessages.innerHTML = "";
      messages.forEach((msg) => {
        const isMe = msg.sender_id === currentUser?.id;
        const msgDiv = document.createElement("div");
        msgDiv.className = `flex flex-col ${
          isMe ? "items-end" : "items-start"
        }`;
        msgDiv.innerHTML = `
          <span class="${
            isMe ? "bg-pong-dark-primary" : "bg-[#BFBEAE]"
          } text-black px-4 py-2 rounded-lg shadow-sm max-w-[70%]">
            ${msg.content}
          </span>
          <span class="text-xs text-pong-highlight ${
            isMe ? "mr-2" : "ml-2"
          } mt-1">
            ${
              isMe ? "You" : friend?.username
            } • ${new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
          </span>
        `;
        chatMessages.appendChild(msgDiv);
      });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    renderMessages();

    startChatListener((msg: MessageSent) => {
      const isRelevant =
        (msg.sender_id === currentUser.id && msg.recipient_id === friend.id) ||
        (msg.sender_id === friend.id && msg.recipient_id === currentUser.id);
      if (isRelevant) {
        messages.push(msg);
        renderMessages();
      }
    });

    if (chatForm && chatInput) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = chatInput.value.trim();
        if (!content) return;

        const newMsg: MessageSent = {
          type: "MESSAGE_SENT",
          sender_id: currentUser.id,
          recipient_id: friend.id,
          content,
          message_id: -1,
        };

        sendChatMessage(newMsg as any);
        messages.push(newMsg);
        renderMessages();
        chatInput.value = "";
      });
    }

    const challengeBtn = section.querySelector(
      "#challenge-button"
    ) as HTMLButtonElement;

    if (challengeBtn) {
      challengeBtn.addEventListener("click", async () => {
        challengeBtn.disabled = true;
        await inviteFriend(currentUser.id, friend.id);
        setTimeout(() => {
          challengeBtn.disabled = false;
        }, 3000);
      });
    }
  }, 500);

  return section;
}
