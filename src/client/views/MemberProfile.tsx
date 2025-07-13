import { NavBar } from "@/components/layout/NavBar";
import { TopBar } from "@/components/layout/TopBar";
import { MemberCard } from "@/components/profile/MemberCard";
import { getUserById } from "@/services/get-user-by-id";
import { styles } from "@/styles/styles";
import { navigateTo } from "@/utils/navigate-to-link";

export function MemberProfile(id: number) {
  const container = document.createElement("section");
  container.className = styles.pageLayoutDark;

  // Show a loader while fetching later
  container.innerHTML = `
    <div class="w-full relative">
      loading...
    </div>
  `;

  getUserById(id).then((user) => {
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

    actions.innerHTML = `
      <button
        id="chat-btn"
        class="bg-pong-accent hover:bg-pong-dark-accent text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition"
        title="Chat"
      >
        <i class="fa-solid fa-comments mr-2"></i>Chat
      </button>
      <button
        id="invite-btn"
        class="bg-pong-highlight hover:bg-yellow-400 text-black px-4 py-2 rounded-full text-xs font-semibold shadow transition"
        title="Invite to Match"
      >
        <i class="fa-solid fa-table-tennis-paddle-ball mr-2"></i>Invite to Match
      </button>
      <button
        id="unfriend-btn"
        class="bg-pong-dark-accent hover:bg-pong-accent text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition"
        title="Unfriend"
      >
        <i class="fa-solid fa-user-minus mr-2"></i>Unfriend
      </button>
      <button
        id="block-btn"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition"
        title="Block"
      >
        <i class="fa-solid fa-ban mr-2"></i>Block
      </button>
    `;

    main.appendChild(actions);
    wrapper.appendChild(main);
    container.appendChild(wrapper);

    setTimeout(() => {
      const chatBtn = document.getElementById("chat-btn");
      const blockBtn = document.getElementById("block-btn");
      const unfriendBtn = document.getElementById("unfriend-btn");
      const inviteBtn = document.getElementById("invite-btn");

      if (chatBtn) {
        navigateTo(`/chat/${user.id}`);
      }
      if (blockBtn) {
        blockBtn.addEventListener("click", () => {
          alert(`Blocked ${user.username}`);
        });
      }
      if (unfriendBtn) {
        unfriendBtn.addEventListener("click", () => {
          alert(`Unfriended ${user.username}`);
        });
      }
      if (inviteBtn) {
        inviteBtn.addEventListener("click", () => {
          alert(`Match invite sent to ${user.username}!`);
        });
      }
    }, 0);
  });

  return container;
}
