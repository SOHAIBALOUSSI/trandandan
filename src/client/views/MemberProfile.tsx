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
		<div class="flex flex-wrap gap-3">
		<button
			id="chat-btn"
			class="flex items-center gap-2 bg-pong-accent hover:bg-pong-accent/80 active:bg-pong-accent/70 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pong-accent/60"
			title="Chat"
		>
			<i class="fa-solid fa-comments"></i>
			Chat
		</button>

		<button
			id="invite-btn"
			class="flex items-center gap-2 bg-pong-highlight hover:bg-yellow-400 active:bg-yellow-300 text-black px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
			title="Invite to Match"
		>
			<i class="fa-solid fa-table-tennis-paddle-ball"></i>
			Invite to Match
		</button>

		<button
			id="unfriend-btn"
			class="flex items-center gap-2 bg-pong-dark-accent hover:bg-pong-accent active:bg-pong-accent/80 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pong-accent/40"
			title="Unfriend"
		>
			<i class="fa-solid fa-user-minus"></i>
			Unfriend
		</button>

		<button
			id="block-btn"
			class="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600/40"
			title="Block"
		>
			<i class="fa-solid fa-ban"></i>
			Block
		</button>
		</div>
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
        chatBtn.addEventListener("click", () => {
          navigateTo(`/lounge/${user.id}`);
        });
      }
      if (blockBtn) {
        blockBtn.addEventListener("click", async () => {
          await blockFriend(user.id);
        });
      }
      if (unfriendBtn) {
        unfriendBtn.addEventListener("click", async () => {
          await removeFriend(user.id);
        });
      }
      if (inviteBtn) {
        inviteBtn.addEventListener("click", async () => {
          await inviteFriend(user.id.toString(), user.id.toString());
          displayToast("Invite sent successfully", "success");
        });
      }
    }, 0);
  });

  return container;
}
