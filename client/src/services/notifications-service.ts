import { Notification } from "types/types";
import { navigateTo } from "@/utils/navigate-to-link";
import { displayToast } from "@/utils/display-toast";
import { getUserById } from "@/services/get-user-by-id";
import { showInviteNotification } from "@/utils/show-invite-notif";
import { getRoomId } from "@/services/get-room-id";
import { acceptInvite } from "@/services/accept-invite";

let ws: WebSocket | null = null;
let unseenCount = 0;
const seenIds = new Set<number>(
  JSON.parse(localStorage.getItem("seenNotifs") || "[]")
);

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
}

// --- Render Single Notification ---
async function renderNotification(notif: Notification, groupedIds?: number[]) {
  const li = document.createElement("li");
  li.className = `
    text-sm text-left text-white p-3 rounded-md shadow-lg border border-pong-dark-primary/40
    bg-pong-dark-bg hover:bg-pong-dark-primary/10 transition-all duration-200 cursor-pointer
  `;
  li.setAttribute("data-id", String(notif.notification_id));
  li.setAttribute("data-sender", String(notif.sender_id));

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

    if (ids.length > 0) {
      markNotificationsAsRead(ids);
      unseenCount = Math.max(0, unseenCount - ids.length);
      updateCounter();
    }

    if (route) navigateTo(route);
    li.remove();
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
  li.setAttribute("data-sender", String(notif.sender_id));
  li.dataset.groupedIds = JSON.stringify(groupedIds); // store all IDs here

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
    const ids = JSON.parse(li.dataset.groupedIds || "[]");

    markNotificationsAsRead(ids); // mark all in group
    unseenCount = Math.max(0, unseenCount - ids.length);
    updateCounter();

    navigateTo(`/lounge/${notif.sender_id}`);
    li.remove();
  };

  return li;
}

// --- Start Notification Listener ---
export function startNotificationListener() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    return;
  }

  ws = new WebSocket("/notifications");

  ws.onopen = () => {};

  ws.onmessage = async (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);

      // Handle unread count update
      if (data.type === "UNREAD_COUNT") {
        unseenCount = data.count;
        updateCounter();
        return;
      }

      // Handle friend request cancellation
      if (data.type === "FRIEND_REQUEST_CANCELED") {
        const notifList = document.getElementById("notif-list");
        if (notifList) {
          Array.from(notifList.children).forEach((li) => {
            if (
              li instanceof HTMLElement &&
              li.innerHTML.includes("fa-user-plus") &&
              li.getAttribute("data-sender") === String(data.sender_id)
            ) {
              li.remove();
            }
          });
        }
        unseenCount = Math.max(0, unseenCount - 1);
        updateCounter();
        return;
      }

      // Increment unseen count only for *new* notification IDs
      if (data.notification_id && !seenIds.has(data.notification_id)) {
        seenIds.add(data.notification_id); // mark as seen first
        unseenCount++;
        updateCounter();
      }

      // Handle rendering notifications
      if (data.notification_id || data.sender_id) {
        const notifList = document.getElementById("notif-list");
        if (notifList) {
          if (data.type === "MESSAGE_RECEIVED") {
            const existingGroup = document.getElementById(
              `msg-group-${data.sender_id}`
            );
            if (existingGroup) {
              const badge = existingGroup.querySelector(
                ".msg-count"
              ) as HTMLSpanElement;
              if (badge) {
                const currentCount = parseInt(badge.textContent || "0");
                badge.textContent = String(currentCount + 1);
              }

              // Append new ID to stored groupedIds
              const ids = JSON.parse(existingGroup.dataset.groupedIds || "[]");
              ids.push(data.notification_id);
              existingGroup.dataset.groupedIds = JSON.stringify(ids);
            } else {
              notifList.prepend(
                await renderGroupedMessageNotification(data, 1, [
                  data.notification_id,
                ])
              );
            }
          } else {
            notifList.prepend(await renderNotification(data));
          }

          // Limit displayed notifications
          while (notifList.children.length > 20) {
            notifList.removeChild(notifList.lastChild!);
          }
        }
      }
    } catch (err) {
      displayToast(
        "The club's lights are out at the moment. Try again shortly.",
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
  };
}

// --- Stop Notification Listener ---
export function stopNotificationListener() {
  if (ws) {
    ws.close();
    ws = null;
  }
  localStorage.removeItem("seenNotifs");
  unseenCount = 0;
  updateCounter();
  seenIds.clear();
  window.dispatchEvent(new CustomEvent("notification-count", { detail: 0 }));
}

// --- Clear All Notifications ---
export function clearAllNotifications() {
  const notifList = document.getElementById("notif-list");
  if (notifList) {
    // Get all notification IDs from current displayed notifications
    const allNotifIds: number[] = [];
    Array.from(notifList.children).forEach((li) => {
      if (li instanceof HTMLElement) {
        const notifId = li.getAttribute("data-id");
        if (notifId) {
          allNotifIds.push(parseInt(notifId));
        }
        // Handle grouped notifications
        if (li.id.startsWith("msg-group-")) {
          const groupedIdsStr = li.getAttribute("data-grouped-ids");
          if (groupedIdsStr) {
            try {
              const groupedIds = JSON.parse(groupedIdsStr);
              allNotifIds.push(...groupedIds);
            } catch (e) {
              console.warn("[Notif] Failed to parse grouped IDs");
            }
          }
        }
      }
    });

    notifList.innerHTML = "";

    // Mark all notifications as read if we have any
    if (allNotifIds.length > 0) {
      markNotificationsAsRead(allNotifIds);
    }
  }

  unseenCount = 0;
  updateCounter();
  seenIds.clear();
  saveSeen();
  window.dispatchEvent(new CustomEvent("notification-count", { detail: 0 }));
}

// --- Mark Notifications As Read ---
export function markNotificationsAsRead(ids: (number | null | undefined)[]) {
  const cleanIds = ids.filter((id): id is number => typeof id === "number");
  if (cleanIds.length === 0) return;

  if (ws && ws.readyState === WebSocket.OPEN) {
    cleanIds.forEach((id) => seenIds.add(id));
    saveSeen();

    ws.send(
      JSON.stringify({
        type: "NOTIFICATION_READ",
        notification_ids: cleanIds,
      })
    );
  }
}
