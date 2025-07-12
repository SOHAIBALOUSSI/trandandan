import { MessageSent } from "types/types";
import { displayToast } from "@/utils/display-toast";

let ws: WebSocket | null = null;
let onMessageCallback: ((msg: MessageSent) => void) | null = null;

export function startChatListener(onMessage: (msg: MessageSent) => void) {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  onMessageCallback = onMessage;

  ws = new WebSocket("ws://localhost:3004");

  ws.onopen = () => {
    console.log("Chat Websocket connection established.");
  };

  ws.onmessage = (event: MessageEvent) => {
    try {
      const message: MessageSent = JSON.parse(event.data);
      if (onMessageCallback) onMessageCallback(message);
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

export function sendChatMessage(msg: Omit<MessageSent, "message_id">) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        ...msg,
        type: "MESSAGE_SENT",
      })
    );
  } else {
    displayToast("Chat connection not established.", "error");
  }
}
