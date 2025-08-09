import { displayToast } from "@/utils/display-toast";

let ws: WebSocket | null = null;
let onlineStatusMap: Record<number, boolean> = {};

export function getUserStatus(userId: number): boolean {
  return onlineStatusMap[userId] || false;
}

export function startStatusListener(): void {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket(`wss://${window.location.host}/profile/statuses`);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.userStatuses) {
        onlineStatusMap = {};
        data.userStatuses.forEach(
          (u: { userId: number; isOnline: boolean }) => {
            onlineStatusMap[u.userId] = u.isOnline;
          }
        );

        window.dispatchEvent(new Event("status-updated"));
      }
    } catch {}
  };

  ws.onerror = () => {
    displayToast(
      "The club’s lights are out at the moment. Try again shortly.",
      "error"
    );
    console.error("Error in status service WebSocket");
  };

  ws.onclose = () => {
    console.log("Connection to status service WebSocket closed");
    ws = null;
    setTimeout(() => {
      startStatusListener();
    }, 5000);
  };
}

export function stopStatusListener(): void {
  if (ws) {
    ws.close();
    ws = null;
    console.log("Status service WebSocket connection stopped.");
  }
}
