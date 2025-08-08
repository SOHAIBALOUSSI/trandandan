import { Notification } from "types/types";
import { navigateTo } from "@/utils/navigate-to-link";
import { displayToast } from "@/utils/display-toast";
import { getUserById } from "@/services/get-user-by-id";
import { showInviteNotification } from "@/utils/show-invite-notif";
import { getRoomId } from "@/services/get-room-id";
import { acceptInvite } from "@/services/accept-invite";

// --- WebSocket and Notification State ---
let ws: WebSocket | null = null;
let unseenCount = 0;
const seenIds = new Set<number>(
  JSON.parse(localStorage.getItem("seenNotifs") || "[]")
);

// --- Utility Functions ---
function saveSeen() {
  localStorage.setItem("seenNotifs", JSON.stringify(Array.from(seenIds)));
}

function updateCounter() {
  const badge = document.getElementById("notif-badge") as HTMLSpanElement;
  if (badge) {
    badge.textContent = unseenCount > 0 ? String(unseenCount) : "0";
    if (unseenCount > 0) {
      badge.classList.remove("text-black", "bg-pong-dark-primary");
      badge.classList.add("text-white", "bg-pong-accent");
    } else {
      badge.classList.add("text-black", "bg-pong-dark-primary");
      badge.classList.remove("text-white", "bg-pong-accent");
    }
  }
  window.dispatchEvent(
    new CustomEvent("notification-count", { detail: unseenCount })
  );
  console.log("[Notif] Counter updated:", unseenCount);
}

// --- Render Single Notification ---
async function renderNotification(notif: Notification, groupedIds?: number[]) {
  const li = document.createElement("li");
  li.className = `
    text-sm text-left text-white p-3 rounded-md shadow-lg border border-pong-dark-primary/40
    bg-pong-dark-bg hover:bg-pong-dark-primary/10 transition-all duration-200 cursor-pointer
  `;
  li.setAttribute("data-id", String(notif.notification_id));

  let route = "";
  let label = "";
  const sender = await getUserById(notif.sender_id || 0);

  // --- Notification Type Switch ---
  switch (notif.type) {
    case "FRIEND_REQUEST_SENT":
      // Friend request sent notification
      label = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-user-plus text-pong-accent text-base"></i>
          <span>
            <span class="text-pong-accent font-semibold normal-case">${sender?.username}</span> sent you a friend request.
          </span>
        </div>
      `;
      route = `/members`;
      break;

    case "FRIEND_REQUEST_ACCEPTED":
      // Friend request accepted notification
      label = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-user-check text-pong-success text-base"></i>
          <span>
            <span class="text-pong-success font-semibold normal-case">${sender?.username}</span> accepted your friend request.
          </span>
        </div>
      `;
      route = `/members/${notif.sender_id}`;
      break;

    case "MESSAGE_RECEIVED":
      // Message received notification
      label = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-message text-pong-accent text-base"></i>
          <span>
            New message from <span class="font-semibold text-pong-accent">${sender?.username}</span>.
          </span>
        </div>
      `;
      route = `/lounge/${notif.sender_id}`;
      break;

    case "INVITE_SENT":
      // Game invite notification
      label = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-gamepad text-pong-accent text-base"></i>
          <span>
            <span class="text-pong-accent font-semibold normal-case">${sender?.username}</span> invited you to a game.
          </span>
        </div>
      `;
      if (!groupedIds) {
        setTimeout(() => {
          showInviteNotification(
            sender?.username || "Unknown",
            async () => {
              const roomId = await getRoomId(notif.sender_id || 0);
              if (roomId) {
                await acceptInvite(
                  roomId,
                  notif.sender_id || 0,
                  notif.recipient_id || 0
                );
                markNotificationsAsRead([notif.notification_id]);
                li.remove();
                navigateTo(`/remote?roomId=${roomId}`);
              }
            },
            () => {
              markNotificationsAsRead([notif.notification_id]);
              li.remove();
              displayToast("Invite declined.", "error");
            }
          );
        }, 0);
      }
      break;

    case "INVITE_ACCEPTED":
      // Invite accepted notification
      displayToast("Invite accepted. Redirecting to game...", "success");
      setTimeout(() => {
        document.getElementById("remote-invite-modal")?.remove();
        navigateTo(`/remote?roomId=${notif.roomId}`);
        markNotificationsAsRead([notif.notification_id]);
        li.remove();
      }, 3000);
      break;

    case "PLAY_AGAIN":
      // Play again notification
      setTimeout(() => {
        showInviteNotification(
          sender?.username || "Unknown",
          async () => {
            const roomId = await getRoomId(notif.sender_id || 0);
            if (roomId) {
              await acceptInvite(
                roomId,
                notif.sender_id || 0,
                notif.recipient_id || 0
              );
              markNotificationsAsRead([notif.notification_id]);
              navigateTo(`/remote?roomId=${roomId}`);
            }
          },
          () => {
            markNotificationsAsRead([notif.notification_id]);
            displayToast("Invite declined.", "error");
          }
        );
      }, 0);
      break;

    default:
      // Default notification
      label = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-bell text-pong-accent text-base"></i>
          <span>New notification received.</span>
        </div>
      `;
      break;
  }

  li.innerHTML = label;

  li.onclick = () => {
    let ids: number[] = [];
    if (groupedIds && groupedIds.length) {
      ids = groupedIds;
    } else if (notif.notification_id) {
      ids = [notif.notification_id];
    }
    markNotificationsAsRead(ids);
    if (route) navigateTo(route);
    li.remove();
    console.log("[Notif] Notification clicked:", notif.type, ids);
  };

  return li;
}

// --- Render Grouped Message Notification ---
async function renderGroupedMessageNotification(
  notif: Notification,
  count: number,
  groupedIds: number[]
) {
  const li = document.createElement("li");
  li.className = `
    text-sm text-white p-3 rounded-md shadow-lg border border-pong-dark-primary/40
    bg-pong-dark-bg hover:bg-pong-dark-primary/10 transition-all duration-200 cursor-pointer flex items-center justify-between
  `;
  li.id = `msg-group-${notif.sender_id}`;
  li.setAttribute("data-id", String(notif.notification_id));

  const sender = await getUserById(notif.sender_id || 0);

  li.innerHTML = `
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-message text-pong-accent text-base"></i>
      <span>
        New messages from <span class="font-semibold text-pong-accent">${sender?.username}</span>.
      </span>
    </div>
    <span class="msg-count bg-pong-accent text-black font-bold px-2 py-0.5 rounded-full ml-4">${count}</span>
  `;

  li.onclick = () => {
    li.style.pointerEvents = "none";
    li.style.opacity = "0.5";
    li.classList.add("line-through");
    li.setAttribute("aria-disabled", "true");
    navigateTo(`/lounge/${notif.sender_id}`);
    setTimeout(() => li.remove(), 400);

    if (groupedIds.length > 0) {
      markNotificationsAsRead(groupedIds);
    }
    console.log("[Notif] Grouped message notification clicked:", groupedIds);
  };

  return li;
}

// --- Notification Listener ---
export function startNotificationListener() {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("/notifications");

  ws.onopen = () => {
    console.log("[Notif] WebSocket connection established.");
  };

  ws.onmessage = async (event: MessageEvent) => {
    try {
      const notif = JSON.parse(event.data);

      console.log("[Notif] Notification received:", notif);

      // --- Handle Friend Request Cancel ---
      if (notif.type === "FRIEND_REQUEST_CANCELED" && notif.sender_id) {
        const notifList = document.getElementById("notif-list");
        if (notifList) {
          Array.from(notifList.children).forEach((li) => {
            if (
              li instanceof HTMLElement &&
              li.innerHTML.includes("fa-user-plus")
            ) {
              li.remove();
              console.log(
                "[Notif] Friend request canceled removed:",
                notif.sender_id
              );
            }
          });
        }
        updateCounter();
        return;
      }

      // --- Handle Grouped Notifications ---
      if (
        typeof notif.notifications_count === "number" &&
        Array.isArray(notif.notification_ids) &&
        notif.notification_ids.length > 0
      ) {
        if (notif.type === "MESSAGE_RECEIVED") {
          const notifList = document.getElementById("notif-list");
          if (notifList) {
            if (notif.type === "MESSAGE_RECEIVED") {
              const oldLi = document.getElementById(
                `msg-group-${notif.sender_id}`
              );
              if (oldLi) oldLi.remove();
              notifList.prepend(
                await renderGroupedMessageNotification(
                  notif,
                  notif.notifications_count,
                  notif.notification_ids
                )
              );
              console.log("[Notif] Grouped message notification rendered.");
            } else {
              notifList.prepend(
                await renderNotification(notif, notif.notification_ids)
              );
              console.log("[Notif] Grouped invite notification rendered.");
            }
          }
          notif.notification_ids.forEach((id: number) => {
            if (!seenIds.has(id)) {
              unseenCount++;
            }
          });
          updateCounter();
          return;
        }
      }

      // --- Handle Single Message Received ---
      if (notif.type === "MESSAGE_RECEIVED") {
        if (notif.notification_id && !seenIds.has(notif.notification_id)) {
          unseenCount++;
          updateCounter();
        }
        const notifList = document.getElementById("notif-list");
        if (notifList) {
          const groupLi = document.getElementById(
            `msg-group-${notif.sender_id}`
          );
          if (groupLi) {
            const badge = groupLi.querySelector(
              ".msg-count"
            ) as HTMLSpanElement;
            if (badge)
              badge.textContent = String(Number(badge.textContent) + 1);
            console.log("[Notif] Message count badge updated.");
          } else {
            notifList.prepend(
              await renderGroupedMessageNotification(notif, 1, [
                notif.notification_id,
              ])
            );
            console.log("[Notif] Single message notification rendered.");
          }
        }
        return;
      }

      // --- Handle Invite Sent ---
      if (notif.type === "INVITE_SENT") {
        if (notif.notification_id && !seenIds.has(notif.notification_id)) {
          unseenCount++;
          updateCounter();
        }
        const notifList = document.getElementById("notif-list");
        if (notifList) {
          notifList.prepend(await renderNotification(notif));
          console.log("[Notif] Invite sent notification rendered.");
        }
        return;
      }

      // --- Handle Play Again ---
      if (notif.type === "PLAY_AGAIN") {
        const notifList = document.getElementById("notif-list");
        if (notifList) {
          notifList.prepend(await renderNotification(notif));
          console.log("[Notif] Play again notification rendered.");
        }
        return;
      }

      // --- Handle Other Notifications ---
      const notifList = document.getElementById("notif-list");
      if (notifList) {
        notifList.prepend(await renderNotification(notif));
        while (notifList.children.length > 20) {
          notifList.removeChild(notifList.lastChild!);
        }
        console.log("[Notif] Other notification rendered.");
      }
      if (notif.notification_id && !seenIds.has(notif.notification_id)) {
        unseenCount++;
        updateCounter();
      }
    } catch (err) {
      displayToast(
        "The club’s lights are out at the moment. Try again shortly.",
        "error"
      );
      console.error("[Notif] Error handling notification:", err);
    }
  };

  ws.onclose = () => {
    ws = null;
    setTimeout(() => {
      startNotificationListener();
    }, 5000);
    console.log("[Notif] WebSocket connection closed. Reconnecting...");
  };
}

// --- Stop Notification Listener ---
export function stopNotificationListener() {
  if (ws) {
    ws.close();
    ws = null;
    console.log("[Notif] Notification WebSocket connection stopped.");
  }
  localStorage.removeItem("seenNotifs");
  unseenCount = 0;
  updateCounter();
  seenIds.clear();
  console.log("[Notif] Notification listener stopped and state cleared.");
  window.dispatchEvent(new CustomEvent("notification-count", { detail: 0 }));
}

// --- Clear Notification Counter ---
export function clearNotificationCounter() {
  unseenCount = 0;
  updateCounter();
  console.log("[Notif] Notification counter cleared.");
}

// --- Clear All Notifications ---
export function clearAllNotifications() {
  const notifList = document.getElementById("notif-list");
  if (notifList) {
    notifList.innerHTML = "";
  }
  unseenCount = 0;
  updateCounter();
  seenIds.clear();
  saveSeen();
  console.log("[Notif] All notifications cleared.");
  window.dispatchEvent(new CustomEvent("notification-count", { detail: 0 }));
}

// --- Mark Notifications As Read ---
function markNotificationsAsRead(ids: (number | null | undefined)[]) {
  const cleanIds = ids.filter((id): id is number => typeof id === "number");
  if (cleanIds.length === 0) return;
  if (ws && ws.readyState === WebSocket.OPEN) {
    cleanIds.forEach((id) => seenIds.add(id));
    saveSeen();
    unseenCount = Math.max(0, unseenCount - cleanIds.length);
    updateCounter();

    ws.send(
      JSON.stringify({
        type: "NOTIFICATION_READ",
        notification_ids: cleanIds,
      })
    );
    console.log("[Notif] Marked notifications as read:", cleanIds);
  }
}
