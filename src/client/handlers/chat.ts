import { MessageSent } from "types/types";
import { displayToast } from "@/utils/display-toast";

let ws: WebSocket | null = null;

export function startChatListener(onMessage: (msg: MessageSent) => void) {
//   if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("/chat");

  ws.onopen = () => {
    console.log("Chat Websocket connection established.");
  };

  ws.onmessage = (event: MessageEvent) => {
    try {
      const message: MessageSent = JSON.parse(event.data);
      if (onMessage) onMessage(message);
    } catch (error) {
      displayToast(
        "The club’s lights are out at the moment. Try again shortly.",
        "error"
      );
    }
  };

  ws.onerror = () => {
    displayToast(
      "The club’s lights are out at the moment. Try again shortly.",
      "error"
    );
  };

  ws.onclose = () => {
    console.log("Chat Websocket connection closed.");
    ws = null;
  };
}

export function stopChatListener() {
  if (ws) {
    ws.close();
    ws = null;
    console.log("Stopping chat Websocket connection.");
  }
}

export function sendChatMessage(msg: MessageSent) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        ...msg,
      })
    );
  } else {
    displayToast("Chat connection not established.", "error");
  }
}
