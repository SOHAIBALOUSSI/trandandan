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
  window.dispatchEvent(
    new CustomEvent("notification-count", { detail: unseenCount })
  );
}

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

  switch (notif.type) {
    case "FRIEND_REQUEST_SENT":
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
      label = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-gamepad text-pong-accent text-base"></i>
          <span>
            <span class="text-pong-accent font-semibold normal-case">${sender?.username}</span> invited you to a game.
          </span>
        </div>
      `;
      // show it only if the user is connected in the app
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
      setTimeout(() => {
        document.getElementById("remote-invite-modal")?.remove();
        navigateTo(`/remote?roomId=${notif.roomId}`);
        markNotificationsAsRead([notif.notification_id]);
        li.remove();
      }, 2000);
      break;

    default:
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
  };

  return li;
}

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
  };

  return li;
}

export function startNotificationListener() {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("/notifications");

  ws.onopen = () => {
    console.log("Notification Websocket connection established.");
  };

  ws.onmessage = async (event: MessageEvent) => {
    try {
      const notif = JSON.parse(event.data);

      if (
        typeof notif.notifications_count === "number" &&
        Array.isArray(notif.notification_ids) &&
        notif.notification_ids.length > 0
      ) {
        if (notif.type === "MESSAGE_RECEIVED") {
          const notifList = document.getElementById("notif-list");
          if (notifList) {
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
          }
          notif.notification_ids.forEach((id: number) => {
            if (!seenIds.has(id)) {
              unseenCount++;
            }
          });
          updateCounter();
          return;
        }
        if (notif.type === "INVITE_SENT") {
          const notifList = document.getElementById("notif-list");
          if (notifList) {
            notifList.prepend(
              await renderNotification(notif, notif.notification_ids)
            );
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
          } else {
            notifList.prepend(
              await renderGroupedMessageNotification(notif, 1, [
                notif.notification_id,
              ])
            );
          }
        }
        return;
      }

      if (notif.type === "INVITE_SENT") {
        if (notif.notification_id && !seenIds.has(notif.notification_id)) {
          unseenCount++;
          updateCounter();
        }
        const notifList = document.getElementById("notif-list");
        if (notifList) {
          notifList.prepend(await renderNotification(notif));
        }
        return;
      }

      if (notif.notification_id && !seenIds.has(notif.notification_id)) {
        unseenCount++;
        updateCounter();
      }
      const notifList = document.getElementById("notif-list");
      if (notifList) {
        notifList.prepend(await renderNotification(notif));
        while (notifList.children.length > 20) {
          notifList.removeChild(notifList.lastChild!);
        }
      }
    } catch (err) {
      displayToast(
        "The club’s lights are out at the moment. Try again shortly.",
        "error"
      );
    }
  };

  ws.onclose = () => {
    ws = null;
    setTimeout(() => {
      startNotificationListener();
    }, 5000);
  };
}

export function stopNotificationListener() {
  if (ws) {
    ws.close();
    ws = null;
    console.log("Notification WebSocket connection stopped.");
  }
}

export function clearNotificationCounter() {
  unseenCount = 0;
  updateCounter();
}

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
  }
}
