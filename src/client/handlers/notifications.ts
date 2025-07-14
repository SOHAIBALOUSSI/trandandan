import { displayToast } from "@/utils/display-toast";
import { Notification } from "types/types";

let ws: WebSocket | null = null;
let unseenCount = 0;

const seenIds = new Set<string>(
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

export function startNotificationListener() {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("ws://localhost:3003");

  ws.onopen = () => {
    console.log("Notification Websocket connection established.");
  };

  ws.onmessage = (event: MessageEvent) => {
    try {
      const notif: Notification = JSON.parse(event.data);

	  console.log("Received notification:", notif);

      const notifId = `${notif.type}-${
        notif.recipient_id
      }-${new Date().getTime()}`;

      if (!seenIds.has(notifId)) {
        seenIds.add(notifId);
        saveSeen();
        unseenCount++;
        updateCounter();
      }

      //  i will add notification to the UI based on type
      switch (notif.type) {
        case "FRIEND_REQUEST_SENT":
          displayToast(
            `New friend request from ${notif.sender_id}.`,
            "warning"
          );
          break;
        case "FRIEND_REQUEST_ACCEPTED":
          displayToast(
            `Your friend request to ${notif.recipient_id} was accepted.`,
            "success"
          );
          break;
        case "FRIEND_REQUEST_REJECTED":
          displayToast(
            `Your friend request to ${notif.recipient_id} was declined.`,
            "warning"
          );
          break;
        case "INVITE_SENT":
          displayToast(
            `You have been invited to a room by ${notif.sender_id}.`,
            "warning"
          );
          break;
        case "MESSAGE_RECEIVED":
          displayToast("You have a new message!", "warning");
          break;
        default:
          break;
      }
    } catch (error) {
      displayToast(
        "The club’s lights are out at the moment. Try again shortly.",
        "error"
      );
    }
  };

  ws.onclose = () => {
    console.warn("Notification WebSocket connection closed.");
    ws = null;

    setTimeout(() => {
      console.log("Reconnecting to WebSocket...");
      startNotificationListener();
    }, 5000);
  };

  ws.onerror = (error) => {
    console.error("Notification WebSocket error:", error);
    displayToast(
      "The club’s lights are out at the moment. Try again shortly.",
      "error"
    );
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
  console.log("Notification counter cleared.");
  unseenCount = 0;
  sessionStorage.setItem("seenNotifs", JSON.stringify([]));
  seenIds.clear();
  updateCounter();
}
