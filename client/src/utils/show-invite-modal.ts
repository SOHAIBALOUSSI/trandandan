import { getFriends } from "@/services/get-friends";
import { getUserById } from "@/services/get-user-by-id";
import { inviteFriend } from "@/services/invite-friend";
import { UserProfile } from "types/types";

export function showInviteModal(me: UserProfile) {
  const oldModal = document.getElementById("remote-invite-modal");
  if (oldModal) oldModal.remove();

  const modal = document.createElement("div");
  modal.id = "remote-invite-modal";
  modal.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/60";
  modal.innerHTML = `
      <div class="bg-pong-dark-bg rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center">
        <h2 class="text-xl font-bold text-pong-accent mb-4">Invite a Friend to Play Online</h2>
        <div id="friends-list" class="w-full flex flex-col gap-3 mb-4">
          <div class="text-center text-pong-dark-secondary">Loading friends...</div>
        </div>
        <button id="close-remote-invite" class="mt-2 px-4 py-2 rounded bg-pong-dark-accent text-white font-semibold hover:bg-pong-accent transition">Cancel</button>
      </div>
    `;
  document.body.appendChild(modal);

  modal.querySelector("#close-remote-invite")?.addEventListener("click", () => {
    modal.remove();
  });

  getFriends().then(async (friendIds) => {
    const list = modal.querySelector("#friends-list");
    if (!list) return;
    if (!friendIds.length) {
      list.innerHTML =
        '<div class="text-center text-pong-dark-secondary">No friends found.</div>';
      return;
    }
    const profiles = await Promise.all(friendIds.map((id) => getUserById(id)));
    list.innerHTML = profiles
      .map((profile) =>
        profile
          ? `<div class="flex items-center justify-between gap-4 bg-pong-dark-primary/40 
            			rounded-xl px-5 py-3 shadow-lg backdrop-blur-sm border border-pong-accent/20 
            			hover:shadow-xl transition-all duration-300 ease-out">
  			  <div class="flex items-center gap-4">
    			<img src="${profile.avatar_url}" 
         			 alt="${profile.username}" 
          			 class="w-10 h-10 rounded-full border-2 border-pong-accent object-cover shadow-sm" />
    			<span class="font-semibold text-white text-lg tracking-tight">${profile.username}</span>
  			  </div>

			  <button class="invite-btn flex items-center justify-center w-10 h-10 
                			bg-pong-accent hover:bg-pong-dark-accent rounded-full 
              			    text-white text-lg shadow-md hover:shadow-lg 
                 			transition-all duration-200 ease-in-out" 
          			  title="Invite"
          			  data-id="${profile.id}">
    					<i class="fa-solid fa-table-tennis-paddle-ball"></i>
  			  </button>
			</div>`
          : ""
      )
      .join("");

    list.querySelectorAll(".invite-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const friendId = Number(
          (e.currentTarget as HTMLElement).getAttribute("data-id")
        );
        btn.setAttribute("disabled", "true");
        if (me) {
          await inviteFriend(me.id, friendId);
        }
        modal.remove();
      });
    });
  });
}
