import { UserProfile } from "types/types";

let ws: WebSocket | null = null;

export function dashboardLive(onData: (data: UserProfile[]) => void) {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("/dashboard/live");

  ws.onopen = () => {
    console.log("Dashboard Websocket connection established.");
  };

  ws.onmessage = (e: MessageEvent) => {
    const dashboardData = JSON.parse(e.data);
    onData(dashboardData);
  };

  ws.onclose = () => {
    ws = null;
    console.log("Dashboard Websocket connection closed.");
  };

  ws.onerror = () => {
    console.error("Error in Dashboard Websocket connection.");
    ws = null;
  };
}

export function stopDashboardListener() {
  if (ws) {
    ws.close();
    ws = null;
    console.log("Dashboard Websocket connection stopped.");
  }
}
