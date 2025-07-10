import { displayToast } from "@/utils/display-toast";
import { FriendNotification } from "types/types";

let ws: WebSocket | null = null;
let unseenCount = 0;

const seenIds = new Set<string>(
  JSON.parse(sessionStorage.getItem("seenNotifs") || "[]")
);

function saveSeen() {
  sessionStorage.setItem("seenNotifs", JSON.stringify(Array.from(seenIds)));
}

function updateCounter() {
  console.log(unseenCount);
  window.dispatchEvent(
    new CustomEvent("notification-count", { detail: unseenCount })
  );
}

export function startNotificationListener() {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  console.log("Starting notification listener...");

  ws = new WebSocket("ws://localhost:3003");

  ws.onopen = () => {
    console.log("WebSocket connection established.");
  };

  ws.onmessage = (event: MessageEvent) => {
    try {
      const notif: FriendNotification = JSON.parse(event.data);

      console.log("Received notification:", notif);

      const { type, sender_id, recipient_id } = notif;
      if (!type || !sender_id || !recipient_id) {
        throw new Error("Invalid notification structure");
      }

      const notifId = `${type}-${sender_id}-${recipient_id}`;

      if (!seenIds.has(notifId)) {
        seenIds.add(notifId);
        saveSeen();
        unseenCount++;
        updateCounter();
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
      displayToast?.(
        "An error occurred while processing notifications.",
        "error"
      );
    }
  };

  ws.onclose = () => {
    console.warn("WebSocket connection closed.");
    ws = null;

    setTimeout(() => {
      console.log("Reconnecting to WebSocket...");
      startNotificationListener();
    }, 5000);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    displayToast?.("WebSocket connection error.", "error");
  };
}

export function stopNotificationListener() {
  if (ws) {
    ws.close();
    ws = null;
  }
  console.log("WebSocket connection stopped.");
}

export function clearNotificationCounter() {
  console.log("Notification counter cleared.");
  unseenCount = 0;
  sessionStorage.setItem("seenNotifs", JSON.stringify([]));
  seenIds.clear();
  updateCounter();
}
