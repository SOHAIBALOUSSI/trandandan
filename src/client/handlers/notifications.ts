import { Notification } from "types/types";
import { navigateTo } from "@/utils/navigate-to-link";
import { displayToast } from "@/utils/display-toast";
import { getUserById } from "@/services/get-user-by-id";
import { getInviteRoomId } from "@/services/get-invite-room-id";
import { acceptInvite } from "@/services/accept-invite";

let ws: WebSocket | null = null;
let unseenCount = 0;
const seenIds = new Set<number>(
  JSON.parse(sessionStorage.getItem("seenNotifs") || "[]")
);

function saveSeen() {
  sessionStorage.setItem("seenNotifs", JSON.stringify(Array.from(seenIds)));
}

function updateCounter() {
  window.dispatchEvent(
    new CustomEvent("notification-count", { detail: unseenCount })
  );
}

async function renderNotification(notif: Notification) {
  const li = document.createElement("li");
  li.className = `
    text-sm text-white p-3 rounded-md shadow-lg border border-pong-dark-primary/40
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
		  <button id="accept-invite">Accept Invite</button>
		  <button id="decline-invite">Decline Invite</button>
        </div>
      `;
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

  if (route) {
    li.onclick = () => {
      li.style.pointerEvents = "none";
      li.style.opacity = "0.5";
      li.classList.add("line-through");
      li.setAttribute("aria-disabled", "true");
      navigateTo(route);
      setTimeout(() => li.remove(), 400);

      if (notif.notification_id) {
        markNotificationsAsRead([notif.notification_id]);
      }
    };
  } else if (notif.type === "INVITE_SENT") {
    li.onclick = async () => {
      if (typeof notif.sender_id === "undefined") {
        displayToast("Invite sender ID is missing.", "error");
        return;
      }
      const roomId = await getInviteRoomId(notif.sender_id.toString());
      await acceptInvite(roomId, notif.sender_id, notif.recipient_id || 0);
      navigateTo(`/remote?roomId=${roomId}`);
      markNotificationsAsRead([notif.notification_id]);
      li.remove();
    };
  }

  return li;
}

const messageGroups: Map<number, { count: number; notif: Notification }> =
  new Map();

async function renderGroupedMessageNotification(
  notif: Notification,
  count: number
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

    markNotificationsAsRead([notif.notification_id]);
    messageGroups.delete(notif.sender_id!);
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
    console.log("Notification received:", event.data);
    try {
      const notif: Notification = JSON.parse(event.data);

      console.log("Parsed notification:", notif);

      if (notif.type === "MESSAGE_RECEIVED") {
        if (notif.notification_id && !seenIds.has(notif.notification_id)) {
          seenIds.add(notif.notification_id);
          saveSeen();
          unseenCount++;
          updateCounter();
        }

        const group = messageGroups.get(notif.sender_id!);
        if (group) {
          group.count += 1;
          const li = document.getElementById(`msg-group-${notif.sender_id}`);
          if (li) {
            const badge = li.querySelector(".msg-count") as HTMLSpanElement;
            if (badge) badge.textContent = String(group.count);
          }
        } else {
          messageGroups.set(notif.sender_id!, { count: 1, notif });
          const notifList = document.getElementById("notif-list");
          if (notifList) {
            notifList.prepend(await renderGroupedMessageNotification(notif, 1));
          }
        }
      } else {
        if (notif.notification_id && !seenIds.has(notif.notification_id)) {
          seenIds.add(notif.notification_id);
          saveSeen();
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
      }
    } catch (error) {
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
  sessionStorage.setItem("seenNotifs", JSON.stringify([]));
  seenIds.clear();
  updateCounter();
}

function markNotificationsAsRead(ids: number[]) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ids.forEach((id) => seenIds.add(id));
    saveSeen();
    unseenCount = Math.max(0, unseenCount - ids.length);
    updateCounter();

    ws.send(
      JSON.stringify({
        type: "NOTIFICATION_READ",
        notification_ids: Array.from(seenIds),
      })
    );
  }
}
