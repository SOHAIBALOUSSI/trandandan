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

      const { type, recipient_id } = notif;

      const notifId = `${type}-${recipient_id}-${new Date().getTime()}`;

      if (!seenIds.has(notifId)) {
        seenIds.add(notifId);
        saveSeen();
        unseenCount++;
        updateCounter();
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
  }
  console.log("Notification WebSocket connection stopped.");
}

export function clearNotificationCounter() {
  console.log("Notification counter cleared.");
  unseenCount = 0;
  sessionStorage.setItem("seenNotifs", JSON.stringify([]));
  seenIds.clear();
  updateCounter();
}
