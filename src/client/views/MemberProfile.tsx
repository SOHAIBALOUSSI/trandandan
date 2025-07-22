import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { getUserById } from "@/services/get-user-by-id";
import { styles } from "@/styles/styles";
import { navigateTo } from "@/utils/navigate-to-link";
import { removeFriend } from "@/services/remove-friend";
import { blockFriend } from "@/services/block-friend";
import { inviteFriend } from "@/services/invite-friend";
import { displayToast } from "@/utils/display-toast";
import { sendFriendRequest } from "@/services/send-friend-request"; // Make sure this exists
import { getAllFriends } from "@/services/get-friends";
import { getCurrentUser } from "@/utils/user-store";

export function MemberProfile(id: number) {
  const me = getCurrentUser();
  if (!me) return;

  const container = document.createElement("section");
  container.className = styles.pageLayoutDark;

  Promise.all([getUserById(id), getAllFriends()]).then(([user, friends]) => {
    if (!user) {
      container.innerHTML = `<div class="text-center text-white py-10">Member not found.</div>`;
      return;
    }

    container.innerHTML = "";
    container.appendChild(NavBar());
    const wrapper = document.createElement("div");
    wrapper.className = "w-full relative";
    wrapper.appendChild(TopBar());
    const main = document.createElement("main");
    main.className = styles.pageContent;

    main.appendChild(MemberCard({ user, showUpdateOptions: false }));

    const actions = document.createElement("div");
    actions.className = "flex flex-wrap gap-3 mt-8 justify-center";

    const isFriend = friends.includes(user.id);

    if (isFriend) {
      actions.innerHTML = `
        <div class="flex flex-wrap gap-3">
          <button id="chat-btn" class="flex items-center gap-2 bg-pong-accent hover:bg-pong-accent/80 active:bg-pong-accent/70 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pong-accent/60" title="Chat">
            <i class="fa-solid fa-comments"></i> Chat
          </button>
          <button id="invite-btn" class="flex items-center gap-2 bg-pong-highlight hover:bg-yellow-400 active:bg-yellow-300 text-black px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/60" title="Invite to Match">
            <i class="fa-solid fa-table-tennis-paddle-ball"></i> Invite to Match
          </button>
          <button id="unfriend-btn" class="flex items-center gap-2 bg-pong-dark-accent hover:bg-pong-accent active:bg-pong-accent/80 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pong-accent/40" title="Unfriend">
            <i class="fa-solid fa-user-minus"></i> Unfriend
          </button>
          <button id="block-btn" class="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600/40" title="Block">
            <i class="fa-solid fa-ban"></i> Block
          </button>
        </div>
      `;
    } else {
      actions.innerHTML = `
        <div class="flex flex-wrap gap-3">
          <button id="add-friend-btn" class="flex items-center gap-2 bg-pong-accent hover:bg-pong-accent/80 active:bg-pong-accent/70 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pong-accent/60" title="Add Friend">
            <i class="fa-solid fa-user-plus"></i> Add Friend
          </button>
        </div>
      `;
    }

    main.appendChild(actions);
    wrapper.appendChild(main);
    container.appendChild(wrapper);

    setTimeout(() => {
      if (isFriend) {
        const chatBtn = document.getElementById("chat-btn");
        const blockBtn = document.getElementById("block-btn");
        const unfriendBtn = document.getElementById("unfriend-btn");
        const inviteBtn = document.getElementById("invite-btn");

        if (chatBtn) {
          chatBtn.addEventListener("click", () => {
            navigateTo(`/lounge/${user.id}`);
          });
        }
        if (blockBtn) {
          blockBtn.addEventListener("click", () => {
            blockFriend(user.id);
          });
        }
        if (unfriendBtn) {
          unfriendBtn.addEventListener("click", () => {
            removeFriend(user.id);
          });
        }
        if (inviteBtn) {
          inviteBtn.addEventListener("click", () => {
            inviteFriend(me.id, user.id);
            displayToast("Invite sent successfully", "success");
          });
        }
      } else {
        const addFriendBtn = document.getElementById("add-friend-btn");
        if (addFriendBtn) {
          addFriendBtn.addEventListener("click", () => {
            sendFriendRequest(user.id);
            displayToast("Friend request sent!", "success");
          });
        }
      }
    }, 0);
  });

  return container;
}
